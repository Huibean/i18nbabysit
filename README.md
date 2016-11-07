<h1 align="center">i8nbabysit</h1>
<h5 align="center">An Online tool to handle your I18n Stuff in seconds!</h5>

##Tool url:
https://i18nbabysit.herokuapp.com/ 

##Usage
Just input your Html code for multi language, and i8nbabysit will compile to 
choosen html template and translate keys

###Example: 

####Input:
english version html code
```html
<p>hello world</p>
```
french version html code
```html
<p>Bonjour le monde</p>
```
prefix key: greeting

template: Rails erb

####Output:
html:
```erb
<p><%= t('greeting.hello_world') %></p>
```
key:
```yml
en:
  greeting:
    hello_world: hello world 
fr:
  greeting:
    hello_world: Bonjour le monde  
```
