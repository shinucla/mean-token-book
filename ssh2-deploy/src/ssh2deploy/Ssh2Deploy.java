package ssh2deploy;

import java.io.*;
import java.nio.file.Paths;

import org.json.*;

import com.trilead.ssh2.Connection;
import com.trilead.ssh2.Session;
import com.trilead.ssh2.StreamGobbler;

/*
 * client side scp command:   remote side scp command:
 * scp foo server:bar         scp -t bar
 * scp server:bar foo         scp -f bar
 * scp *.txt server:dir       scp -d -t dir
 * 
 * remote side "scp -t bar" using ssh2 java lib:
 * create the connection
 * create the session
 * session.execCommand("scp -t destination_file_name");
 * 
 * OutputStream os = new BufferedOutputStream(session.getStdin(), 40000);
 * InputStream is = new BufferedInputStream(session.getStdout(), 512);
 * 
 * os.write(String
 *            .format("C%s %s %s\n",
 *                    context.getMode(),
 *                    context.getFileLength(),
 *                    context.getRemoteFileName())
 *            .getBytes("ISO-8859-1"));
 * os.flush();
 * 
 * InputStream source = context.createSourceInputStream();
 *
 * try {
 *   XFile.transfer(source, os);
 *
 * } finally {
 *   source.close();
 * }
 * 
 * os.write(0);
 * os.flush();
 *
*/

public class Ssh2Deploy {
	public static enum DeployTypeEnum { SSL, CONF, REBOOT }
	
  public static void main(String[] args)
    throws Exception
  {
		String currentRunningDir = Paths.get(".").toAbsolutePath().normalize().toString();
		JSONObject config = new JSONObject(new JSONTokener(new InputStreamReader(new FileInputStream("deploy-config.json"))));

		switch (Enum.valueOf(DeployTypeEnum.class, config.getString("type"))) {
		case SSL: 
		case CONF:
		case REBOOT:
		default:
		}

		JSONObject host = (JSONObject) config.get("host");
    String hostname = host.getString("ip");
    int port = host.getInt("port");
    String username = host.getString("user");
    File keyfile = new File(host.getString("pem")); 
    String keyfilePass = ""; /* will be ignored if not needed */

    Connection conn = new Connection(hostname, port);
    conn.connect();
    boolean isAuthenticated = conn.authenticateWithPublicKey(username, keyfile, keyfilePass);

    if (isAuthenticated == false) {
      throw new IOException("Authentication failed.");
    }

		JSONArray files = config.getJSONArray("files");
		for (int i = 0; i < files.length(); i++) {
			JSONObject file = (JSONObject) files.get(i);
			scp(conn, file.getString("from"), file.getString("to")); // copy a file from local to remote
		}
		
    // executing a command on remote
    Session sess = conn.openSession();
    sess.execCommand("uname -a && date && uptime && last");
    InputStream stdout = new StreamGobbler(sess.getStdout());
    BufferedReader br = new BufferedReader(new InputStreamReader(stdout));
    System.out.println("Here is some information about the remote host:");

    while (true) {
      String line = br.readLine();
      if (line == null)
        break;
      System.out.println(line);
    }

    sess.close();
    conn.close();
  }

  /*
   * fromLocal: file path from local
   * toRemote: file path to remote server
   */
  private static void scp(Connection connection, String fromLocal, String toRemote)
    throws Exception
  {
    Session session = connection.openSession();
    session.execCommand("scp -t " + toRemote);

    OutputStream os = new BufferedOutputStream(session.getStdin(), 40000);
    InputStream is = new BufferedInputStream(session.getStdout(), 512);
    File srcFile = new File(fromLocal);

    os.write(String
             .format("C0666 %s %s\n",
                     srcFile.length(),
                     srcFile.getName())
             .getBytes("ISO-8859-1"));
    os.flush();

    InputStream fin = new FileInputStream(srcFile);
    try {
      byte[] buf = new byte[8192];
      int bytesRead = 0;
      while (-1 != (bytesRead = fin.read(buf))) {
        os.write(buf, 0, bytesRead);
      }

    } finally {
      fin.close();
    }

    os.write(0);
    os.flush();
    session.close();
  }
}
