# Cavallo Luca 
### 4B Inf - IIS G.Vallauri, Fossano

> You can use AJAX to call the Random User Generator API and will receive a randomly generated user in return. If you are using jQuery, you can use the $.ajax() function in the code snippet below to get started.

```
$.ajax({
  url: 'https://randomuser.me/api/',
  dataType: 'json',
  success: function(data) {
    console.log(data);
  }
});
```
