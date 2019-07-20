import 'package: flutter/material.dart';
import '../models/record-field.dart';

class RecordFieldComponent extends StatefulWidget {
  RecordField field;

  RecordFieldComponent({ Key key, @required this.field }): super(key: key);

  @override _ComponentSate createState() => new _ComponentState();
}

class _ComponentState extends State<RecordFieldComponent> {
  @override Widget build(BuildContext context) => Scaffold(
  );
}
