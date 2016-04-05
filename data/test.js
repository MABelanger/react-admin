
function getResult(str){

	return str.match(/<span>(.*?)<\/span>/g).map(function(noColor){
    noColor = noColor.replace(/<\/?span>/g,'') + '</span>';
    console.log('noColor', noColor);


	  return noColor.match(/<span.*>(.*?)<\/span>/g).map(function(val){
      console.log('val', val);
	    return val.replace(/<\/?span>/g,'');
	  });
	});
}

function getResult2(str){

  if(str.match(/<span>(.*?)<\/span>/g)){
    return str.match(/<span>(.*?)<\/span>/g).map(function(noColor){
      noColor = noColor.replace(/<\/?span>/g,'') + '</span>';
      console.log('noColor', noColor);
      //var reg = '/<span.*>(.*?)<\/span>/g';
      var reg = new RegExp("<span.*>(.*?)<\/span>", "g");
      if(reg.exec(noColor)){
        return reg.exec(noColor)[1];
      }else {
        return noColor;
      }

    });
  } else {
    return str;
  }
}



var str='<span>' 
          + '<span class="bibi">'
            + 'hello'
          + '</span>'
        + '</span>';
//console.log(getResult2(str))

