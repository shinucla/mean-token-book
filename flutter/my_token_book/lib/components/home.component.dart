import 'package:flutter/material.dart';

class HomeComponent extends StatelessWidget {
  int counter;

  HomeComponent({ Key key, int this.counter }) : super(key: key);

  @override
  Widget build(BuildContext context) => ListView(
    padding: const EdgeInsets.all(8.0),
    children: <Widget>[
      Container(child: new Content( myCounter: counter ))
    ]
  );

  @override
  Widget buildOld(BuildContext context) {
    final List<String> entries = <String>['A', 'B', 'C'];
    final List<int> colorCodes = <int>[600, 500, 100];

    return ListView.builder(
      padding: const EdgeInsets.all(8.0),
      itemCount: 100,
      itemBuilder: (BuildContext context, int index) {
        return Container(
          color: Colors.amber[600],
          //child: Center(child: Text('Entry ${entries[index]}')),
          child: Center(child: Text('Entry ${ counter }')),
        );
      }
    );
  }

}


class Content extends StatelessWidget {
  int myCounter;

  Content({ Key key, int this.myCounter }) : super( key: key);

  @override
  Widget build(BuildContext context) => Center(
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[

        Text(
          'row 1',
        ),

        Text(
          'row 2',
          style: Theme.of(context).textTheme.display1,
        ),

        Text('row 3: ${ myCounter }'),

        Row(
          children: <Widget>[
            Text('row 4, column 1'),
            Icon(Icons.sentiment_very_satisfied)
          ]),

        Icon(Icons.sentiment_very_satisfied)
      ]
    ));
}
