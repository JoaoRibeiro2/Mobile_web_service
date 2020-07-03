// This is a JavaScript file
//Ações de mudança de tela
$(document).on("click","#listar", function(){
  $(location).attr("href","listar.html");
});



$(document).on("click","#salvar",function(){
  var parametros = {
    "nome":$("#nome").val(),
    "senha":$("#senha").val(),
    "email":$("#email").val()
  }

  $.ajax({
    type:"post",
    url:"http://wordpress-online-2.000webhostapp.com/webservice/cadastra.php",
    data:parametros,

    success: function(data){
      navigator.notification.alert(data);
      $("#nome").val(""),
      $("#senha").val(""),
      $("#email").val("")
    },

    error:function(data){
       navigator.notification.alert("Erro no cadastro");
    }
  });
});


function listar(){
  $.ajax({
    type: "post",
    url: "https://wordpress-online-2.000webhostapp.com/webservice/listar.php",
    dataType: "json", // O que receber
    success: function(data){
      var itemLista = "";
      $.each(data.pessoas, function(i,dados){
        itemLista += "<option value="+dados.codigo+">"+dados.nome+"</option>";
      });
      $("#listaPessoas").html(itemLista);
    },
     error:function(data){
       navigator.notification.alert("Erro ao buscar registro");
    }
  });
}

$(document).on("change","#listaPessoas", function(){
  var parametro = {
    "codigo": $("option:selected",("#listaPessoas")).val()
  }

  $.ajax({
    type: "post",
    url: "https://wordpress-online-2.000webhostapp.com/webservice/listar-um-registro.php",
    data: parametro, 
    dataType: "json", // O que receber
    success: function(data){
    $("#codigo").val(data.pessoa.codigo);
    $("#nome").val(data.pessoa.nome);
    $("#email").val(data.pessoa.email);
    $("#senha").val(data.pessoa.senha);
    },
     error:function(data){
       navigator.notification.alert("Erro ao buscar registro")
      }
  });
});