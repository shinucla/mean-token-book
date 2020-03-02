import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:my_token_book/service/ServerService.dart';
import 'package:my_token_book/service/UserRepository.dart';
import 'package:my_token_book/service/TokenRepository.dart';
import 'package:my_token_book/service/StorageService.dart';
import 'package:my_token_book/screen/SettingsScreen.dart';
import 'package:my_token_book/screen/AddFamilyMemberScreen.dart';

import 'package:my_token_book/model/AuthRoleModel.dart';
import 'package:my_token_book/model/ChildrenTokenCountNotifier.dart';

class HomeScreen extends StatefulWidget {
  @override
  _State createState() => _State();
}

class _State extends State<HomeScreen> {
  List<Widget> childrenCards = [];

  @override
  void initState() {
    super.initState();

    ServerService().resolve('/api/token-event/getChildrenTokenCounts', {}).then((data) {
        List<Widget> cards = [];
        for (var child in data) {
          cards.add(createChildCard(child));
        }
        setState((){ this.childrenCards = cards; });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("My Token Book"),
        actions: [
          IconButton(icon: Icon(Icons.refresh), onPressed: () { _loadChildrenTokenCounts(context); }),
          IconButton(icon: Icon(Icons.settings), onPressed: () { _navToSettingsScreen(context); }),
        ],
      ),
      body: Center(
        child: ListView(
          shrinkWrap: true,
          children: this.childrenCards,
        )
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            title: Text('Home')
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.assignment),
            title: Text('Dashboard')
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.add),
            title: Text('Add')
          ),
        ],
        onTap: (index) {
          switch (index) {
            case 0: break;
            case 1: _navToDashboardScreen(context); break;
            case 2: _navToAddFamilyMemberScreen(context); break;
          }
        }
      ),
    );
  }

  _navToDashboardScreen(context) {
    
  }

  _navToAddFamilyMemberScreen(context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => AddFamilyMemberScreen()),
    );
  }

  _loadChildrenTokenCounts(context) {
    ServerService().resolve('/api/token-event/getChildrenTokenCounts', {}).then((data) {
        List<Widget> cards = [];
        for (var child in data) {
          cards.add(createChildCard(child));
        }
        setState((){ this.childrenCards = cards; });
    });
  }
  
  _navToSettingsScreen(context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => SettingsScreen()),
    );
  }

  Widget createChildCard(child) {
    child['sum'] = null == child['sum'] ? 0 : child['sum'];
    
    return Center(
      child: Card(
        color: Colors.deepOrange[50],
        child: InkWell(
          splashColor: Colors.pink[200], //blue.withAlpha(30),
          //onTap: () { Navigator.push(context, MaterialPageRoute(builder: (context) => AddFamilyMemberScreen())); },
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                CircleAvatar(backgroundImage: AssetImage('assets/sharkla.png'), radius: 50.0),
                Container(
                  alignment: Alignment.centerRight,
                  child: Column(
                    children: [
                      Text('${child["first_name"]} ${child["last_name"]}', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 35.0)),
                      Text('${child["sum"]} tokens', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20.0)),
                    ]
                  )
                ) // Container
              ]
            ) // Row
          )
        ) // InkWell
      ) // Card
    );
  }
}
