
# sample from egghead.io
  https://egghead.io/lessons/react-add-a-toggle-all-complete-button-with-react-native-touchableopacity

  https://github.com/browniefed/examples/tree/todo/togglecomplete/todo

  
# debugging
  int the android emulator press: cmd-m

  http://localhost:8081/debugger-ui/

  https://github.com/facebook/react-native/issues/19022
  
  in your app's ios folder, look for a file called <yourAppName>.xcscheme. There's a property called runnableDebuggingMode = "0" that I set to "1". And all worked as the directions say.

  using ``console.table(obj)`` to show a formated output

# bind this to class method 
  in constructor:
    this.myHandler = this.myHandler.bind(this);

    myHandler() { .....}

  or (ES6):

    myHandler = () => { ... }

# PanResponder
  https://egghead.io/lessons/react-react-native-panresponder-basics
  https://github.com/joemaddalone/react-native-lessons/tree/master

  
