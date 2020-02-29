/*
 * fields: [{ name: string,
 *            title: string,
 *            type: string,
 *            values?: [obj],
 *            displayKey?: string,
 *            valueKey?: string,
 *            required?: boolean,
 *            visible?: boolean,
 *            disabled?: boolean,
 *            min?: int, // for string: min length, for int: min value
 *            max?: int, // for string: max length, for int: max value
 *          },
 *          { ... }]
 *
 */
class FieldRecord {
  String name;
  String title;
  String type;
  List<Map> values;
  String displayKey;
  String valueKey;
  bool required;
  bool visible;
  bool disabled;
  num min;
  num max;
  
  FieldRecord({ @required this.name,
                @required this.title,
                @required this.type });


 
}
