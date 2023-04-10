
var swith=0,idll=0,idl2=0;
var data_tab=[],tab_row=[];
var data_tabs={},add_datas=[],add_noms=[],Motife_s=[];
var ord="",sew_ordre=0,typs=0,row_all=[];
const aoColumn= [{'sTitle': 'id',  "bVisible": true, "bSearchable": false},
{'sTitle': 'Nemuro_Ordre', 'bVisible': true},
{'sTitle': 'Date_Ordre', 'bVisible': true},
{'sTitle': 'Matricule',  'bVisible': true},
{'sTitle': 'Nom_Prenom',  'bVisible': true},
{'sTitle': 'Grade_Fonction',  'bVisible': true},
{'sTitle': 'Service_attache',  'bVisible': true},
{'sTitle': 'Destination', 'bVisible': true},
{'sTitle': 'Motif_mission','bVisible': true},
{'sTitle': 'Date_Depart', 'bVisible': true},
{'sTitle': 'Heure_Depart', 'bVisible': true},
{'sTitle': 'Date_Retour', 'bVisible': true},
{'sTitle': 'Heure_Retour', 'bVisible': true}
]
const aoColumn2= [{'mData': 'id', 'sTitle': 'id', "bVisible": true, "bSearchable": false},
{'mData': 'Nemuro_Ordre','sTitle': 'Nemuro_Ordre', 'bVisible': true},
{'mData': 'Date_Ordre','sTitle': 'Date_Ordre', 'bVisible': true},
{'mData': 'Matricule','sTitle': 'Matricule',  'bVisible': true},
{'mData': 'Nom_Prenom','sTitle': 'Nom_Prenom',  'bVisible': true},
{'mData': 'Grade_Fonction','sTitle': 'Grade_Fonction',  'bVisible': true},
{'mData': 'Service_attache','sTitle': 'Service_attache',  'bVisible': true},
{'mData': 'Destination','sTitle': 'Destination', 'bVisible': true},
{'mData': 'Motif_mission','sTitle': 'Motif_mission','bVisible': true},
{'mData': 'Date_Depart','sTitle': 'Date_Depart',  'bVisible': true},
{'mData': 'Heure_Depart','sTitle': 'Heure_Depart', 'bVisible': true},
{'mData': 'Date_Retour','sTitle': 'Date_Retour', 'bVisible': true},
{'mData': 'Heure_Retour','sTitle': 'Heure_Retour', 'bVisible': true}
]
const aoColumn3= [{'mData': 'id', 'sTitle': 'id', "bVisible": true, "bSearchable": false},
{'mData': 'matricule','sTitle': 'matricule', 'bVisible': true},
{'mData': 'nom','sTitle': 'nom', 'bVisible': true},
{'mData': 'service','sTitle': 'service',  'bVisible': true},
{'mData': 'grade','sTitle': 'grade',  'bVisible': true}]
const aoColumn4= [{'sTitle': 'id', 'bVisible': true, "bSearchable": false},
{'sTitle': 'matricule', 'bVisible': true},
{'sTitle': 'nom','bVisible': true},
{'sTitle': 'service','bVisible': true},
{'sTitle': 'grade','bVisible': true}]

$(document).ready(function () {
  $('#chkParent').click(function() {
    var isChecked = $(this).prop("checked");
    $('#table-fac tr:has(td)').find('input[type="checkbox"]').prop('checked', isChecked);
  });  
  $('#table-fac tbody').on('click', 'tr', function (event) {
    if ( $(this).hasClass('tiers') ) {
     $(this).removeClass('tiers');
 }
 else {
     $('#table-fac tr').removeClass('tiers');
     $(this).addClass('tiers');
  var input = $(this).find('input[type="text"]');
  var inputValue = input.val();
  var rows = [];
    $(this).find("td").each(function(cell,v) {
    if (typeof rows[cell] === 'undefined') rows[cell] = [];
    rows[cell]= $(this).html();
    });
    $(this).find('input[type="checkbox"]').prop('checked', true);
    row_all[0]={ordre:inputValue,nom:rows[2],matricule:rows[3],service:rows[5],grad:rows[6]};
    console.log(inputValue,row_all[0]);
      
   }
});
});


function affiche_diftab(){
  var objectStore = db.transaction("employee2").objectStore("employee2");
  var i=0;
  data_tab=[];
  objectStore.openCursor().onsuccess = function(event) {
   var cursor = event.target.result;
   if (cursor) {
           data_tab[i]={"id":cursor.value.id,"matricule":cursor.value.matricule,"nom":cursor.value.nom,"service":cursor.value.service,"grade":cursor.value.grade}
           cursor.continue();i++;
       } 
   if (!cursor) {
    var result2=json2array(data_tab);
    var result1=json2array(data_tabs);
    var props = ["id", "matricule","nom","service","grade"];
        var result = result1.filter(function(o1){
            return !result2.some(function(o2){
                return o1.matricule === o2.matricule;          // assumes unique id
            });
        }).map(function(o){
            return props.reduce(function(newo, desi){
                newo[desi] = o[desi];
                return newo;
            }, {});
        });
      data_tabs=result; 
      $('#loyee_data').html("");
      $('#loyee_data').html( '<table cellpadding="0" style="width:100%" class="display" cellspacing="0" border="0"  id="dtBasi_inv2"></table>' );
     // console.dir(datas);

     var table=$('#dtBasi_inv2').dataTable( {
                         "aaData":result,
                         "aoColumns": aoColumn3,
                         "sScrollY": "400px",
                         "sScrollX": "900px",
                             "aLengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                                 "bPaginate": true,

                     } );
             
                    }
                  }
     
          }
function json_array(json){
  var result = [];
 for (var a in json){
 result[a] = [json[a].id,json[a].matricule,json[a].nom,json[a].service,json[a].grade];
  }
  return result;
}
function get_ordre(){
  getgroupe('table-fac');
  let roll=[],len=0;
  if(row_group==undefined) {return;}
  else{
  for(var i in row_group[0]){
  roll.push(row_group[1][i]);
  }
  if(roll.length<1) return;
  let num=Math.max(...roll);
   $("#ordre_group").val(num+1);
   roll.length<10 ? len="0"+roll.length:len=roll.length;
   $("#filexcel02").html("--/"+len);
  }
  }
function get_Matricule(){
  var Nom_Prenom=$("#Nom_Prenom").val();
  for (var i in add_noms) {
  if(Nom_Prenom==add_noms[i][1]){
       $("#Matricule").val(add_noms[i][0]);
       $("#Grade_Fonction").val(add_noms[i][3]);
       $("#Service_attache").val(add_noms[i][2]);
   }
  }     
}


async function ajouter(){
  async function run0(){
    getgroupe('table-fac');
    let roll=[];
    if(row_group==undefined) {return;}
    else{
    for(var i in row_group[0]){
    roll.push({nom:row_group[2][i],ordre:row_group[1][i],matricule:row_group[3][i],service:row_group[5][i],grade:row_group[6][i]});
    }
    let Nom_Prenom= $("#nom_group").val();
    for(var i in roll){
    if(Nom_Prenom===roll[i].nom) {
      alert("nom existe");
      return ;
    }
    }
    }
    }
  async function run1(){
  var Nom_Prenom= $("#nom_group").val();
  var num_ordre=$("#ordre_group").val();
  console.log(add_datas);
  for(var i in add_datas){
    if(Nom_Prenom==add_datas[i].nom){
      tab_row[0]=add_datas[i];
    }
  }
  if(tab_row[0]!==undefined && Nom_Prenom!==""){
  var markup ="<tr class='tier'><td class='td0_rt'><input style='border:1px solid #ccc;' type='checkbox'  name='record'></td><td class='td0_rt2' style='text-align:left;'><input class='input_tab' type='text' value='" + num_ordre + "'/></td><td class='td0_rt3'>"+Nom_Prenom+"</td><td class='td0_rt3'>"+tab_row[0][1]+"</td><td class='td0_rtl'><button onclick='Print_Gtoup();' type='button' class='btn btn-outline-warning btn-sm'>Print</button</td><td class='td0_rt2' style='text-align:left;'>" + tab_row[0][3] + "</td><td class='td0_rt2' style='text-align:left;'>" + tab_row[0][4] + "</td></tr>";
  $(".table_tbody").find('input[name="record"]').each(function(){
    if($(this).is(":checked")){
        typs=1; 
      }
    }); 
      if(typs==1){
        $(".table_tbody").find('input[name="record"]').each(function(){
       if($(this).is(":checked")){
        $(this).parents("tr").after(markup);
        $(this).prop('checked', false); // Not Works Here
        typs=0; 
      }
     });
      }else {
        $(".table_tbody").append(markup);
          } 
        }else{
          alert("pas de result");
        }     
}
async function run2(){
  var Nom_Prenom= $("#nom_group").val();
  if(tab_row[0]!==undefined && Nom_Prenom!==""){
    get_ordre();
 }
}
await run0();await run1();await run2();
}

async function dell(){
  async function newFunction() {
   $(".table_tbody").find('input[name="record"]').each(function(){
       if($(this).is(":checked")){
          $(this).parents("tr").remove();
       }
   });
}
await newFunction();
  
}



function readAll2() {
  var htm1="";
   add_noms=[];
 $.ajax({
  type:"get",
  url:"/get-all2",
  success: function(response){
    var data_t=JSON.parse(JSON.stringify(response));
    for(var i in data_t){
    add_noms[i]={id:data_t[i].id,matricule:data_t[i].matricule ,nom:data_t[i].nom,
    service:data_t[i].service,grade:data_t[i].grade}
    htm1+="<option style='font-size:24px' value='"+data_t[i].nom+"'>"+data_t[i].nom+"</option>";
      }
      Try_double(); 
      $("#service11").html(htm1);  $("#service110").html(htm1);
    
    }
   }) ;
  }  
    
  
function my_time() {
 var x1 = $("#Heure_Depart").val();
 var x2 = $("#Heure_Retour").val();
 if(x1!==""){
 var arr1=(x1.match(/\d+/g));
 if(arr1[0] && arr1[1]){
 $("#H_Depart").html(arr1[0]);$("#Min_Dep").html(arr1[1]);
 $("#H_Depart").css("color","black"); $("#Min_Dep").css("color","black");
 } 
}else{
  $("#H_Depart").html("--");$("#Min_Dep").html("--");
  $("#H_Depart").css("color","white"); $("#Min_Dep").css("color","white");
}
if(x2!==""){
  var arr2=(x2.match(/\d+/g));
  if(arr2[0] && arr2[1]){
  $("#Heure_Ret").html(arr2[0]);$("#Min_Ret").html(arr2[1]);
  $("#Heure_Ret").css("color","black"); $("#Min_Ret").css("color","black");
  }
}else{
  $("#Heure_Ret").html("--");$("#Min_Ret").html("--");
  $("#Heure_Ret").css("color","white"); $("#Min_Ret").css("color","white");
}
}

function Try_double() {
var htm1=" <datalist id='service15'><option selected value=''>...</option>"; 
var htm2=" <datalist id='service14'><option selected value=''>...</option>"; 
if(add_noms.length>0){
var double_Motife=[],double_Distination=[];
  for (var i in Motife_s){
    double_Motife[i] = Motife_s[i][0];
    double_Distination[i]=Motife_s[i][1];
}
var cache3 = {},cache4={};
var   monTabl3 = double_Motife.filter(function(elem,index,array){
  return cache3[elem]? 0 :cache3[elem]=1;
  });
  var   monTabl4 = double_Distination.filter(function(elem,index,array){
    return cache4[elem]? 0 :cache4[elem]=1;
    });
   
 for(var i=0;i<monTabl3.length;i++){
  htm1+="<option value='"+monTabl3[i].replace("'","ʾ")+"'>"+monTabl3[i]+"</option>";
  }  
  for(var i=0;i<monTabl4.length;i++){
    htm2+="<option value='"+monTabl4[i].replace("'","ʾ")+"'>"+monTabl4[i]+"</option>";
    }  
         
 htm1+= "</datalist>";  htm2+= "</datalist>";
 $("#Motif_mission").html(htm1);    $("#Destination").html(htm2);
}else{alert("Pas IMO Double");}
}

function PSR_impriment() { 
  my_time();
 var Nemuro_Ordre=  $("#Nemuro_Ordre").val();var Date_Ordre=  $("#Date_Ordre").val().split("-").reverse().join("/");var Matricule=  $("#Matricule").val();var Nom_Prenom=  $("#Nom_Prenom").val();
  var Grade_Fonction=  $("#Grade_Fonction").val();var Service_attache=  $("#Service_attache").val();
  var dot=$("#dot_all").val();var Destination=  $("#Destination").val().replace("ʾ","'");var Motif_mission=  $("#Motif_mission").val().replace("ʾ","'");var Date_Depart=  $("#Date_Depart").val().split("-").reverse().join("/");
  if($("#Date_Retour").val()!=="") {var Date_Retour=  $("#Date_Retour").val().split("-").reverse().join("/");
  $("#date_r").css("color","black")}
  
  else  {var Date_Retour="00/00/0000";$("#date_r").css("color","white");}
 $("#date_du").html("…"+Date_Ordre+"………");
 $("#dot_alls").html(dot); 
  $("#n_ordre").html("…"+Nemuro_Ordre +"…du…"+Date_Ordre+"………");
  $("#nom_prenom").html("…"+Nom_Prenom+"……");
  $("#matricule_").html("…"+Matricule+"……");
  $("#grade_").html("…"+Grade_Fonction+"……");
  $("#attache_").html("…"+Service_attache+"……");
  $("#destin_").html("…"+Destination+"……");
  $("#motif_").html("…"+Motif_mission+"…………");
  $("#date_d").html(Date_Depart);
  $("#date_r").html(Date_Retour+" ");
  }
  function PSR_impriment2() { 
    my_time();
   var Nemuro_Ordre= row_all[0].ordre;var Date_Ordre=  $("#Date_Ordre").val().split("-").reverse().join("/");var Matricule=  row_all[0].matricule;var Nom_Prenom= row_all[0].nom ;
    var Grade_Fonction= row_all[0].grad;var Service_attache= row_all[0].service;
    var dot=$("#dot_all").val();var Destination=  $("#Destination").val().replace("ʾ","'");var Motif_mission=  $("#Motif_mission").val().replace("ʾ","'");var Date_Depart=  $("#Date_Depart").val().split("-").reverse().join("/");
    if($("#Date_Retour").val()!=="") {var Date_Retour=  $("#Date_Retour").val().split("-").reverse().join("/");
    $("#date_r").css("color","black")}
    
    else  {var Date_Retour="00/00/0000";$("#date_r").css("color","white");}
   $("#date_du").html("…"+Date_Ordre+"………");
   $("#dot_alls").html(dot); 
    $("#n_ordre").html("…"+Nemuro_Ordre +"…du…"+Date_Ordre+"………");
    $("#nom_prenom").html("…"+Nom_Prenom+"……");
    $("#matricule_").html("…"+Matricule+"……");
    $("#grade_").html("…"+Grade_Fonction+"……");
    $("#attache_").html("…"+Service_attache+"……");
    $("#destin_").html("…"+Destination+"……");
    $("#motif_").html("…"+Motif_mission+"…………");
    $("#date_d").html(Date_Depart);
    $("#date_r").html(Date_Retour+" ");
    }
    async function PSR_impriment3(sl) { 
      async function run01(e){ 
      if(e==0)  my_time();
       var Nemuro_Ordre= roll_Group[e].ordre;var Date_Ordre=  $("#Date_Ordre").val().split("-").reverse().join("/");var Matricule=  roll_Group[e].matricule;var Nom_Prenom= roll_Group[e].nom ;
       var Grade_Fonction= roll_Group[e].grade;var Service_attache= roll_Group[e].service;
       var dot=$("#dot_all").val();var Destination=  $("#Destination").val().replace("ʾ","'");var Motif_mission=  $("#Motif_mission").val().replace("ʾ","'");var Date_Depart=  $("#Date_Depart").val().split("-").reverse().join("/");
       if($("#Date_Retour").val()!=="") {var Date_Retour=  $("#Date_Retour").val().split("-").reverse().join("/");
       $("#date_r").css("color","black")}
       else  {var Date_Retour="00/00/0000";$("#date_r").css("color","white");}
      $("#date_du").html("…"+Date_Ordre+"………");
      $("#dot_alls").html(dot); 
       $("#n_ordre").html("…"+Nemuro_Ordre +"…du…"+Date_Ordre+"………");
       $("#nom_prenom").html("…"+Nom_Prenom+"……");
       $("#matricule_").html("…"+Matricule+"……");
       $("#grade_").html("…"+Grade_Fonction+"……");
       $("#attache_").html("…"+Service_attache+"……");
       $("#destin_").html("…"+Destination+"……");
       $("#motif_").html("…"+Motif_mission+"…………");
       $("#date_d").html(Date_Depart);
       $("#date_r").html(Date_Retour+" ");
       page_print[e]= $("#page-container").html();
        }
       await run01(sl);
     }
  
 async function print_allpage (){
      page_print=[];
        async function run01(){ 
          getgroupe('table-fac');
          roll_Group=[];
          if(row_group==undefined) {return;}
          else{
          for(var i in row_group[0]){
          roll_Group.push({nom:row_group[2][i],ordre:row_group[1][i],matricule:row_group[3][i],service:row_group[5][i],grade:row_group[6][i]});
          }
          }
         } 
       async function run02(){
       for(var i in roll_Group) {
        PSR_impriment3(i);
       }  
       }  
       async function run03(){
        let str=""
        for(var i in page_print){
        str+=page_print[i];
        }
        $("#page-container").html(str);
        }  
        async function run04(){
        var PSR_f1 = null; 
        var PSR_content=document.getElementById('print').parentNode.innerHTML; 
        if (PSR_f1) {if(!PSR_f1.closed) PSR_f1.close();} 
        PSR_f1 = window.open ('', 'PRINT', "height=650,width=900,top=100,left=150"); 
        PSR_f1.document.open(); 
        PSR_f1.document.write("<html><meta http-equiv='content-type' content='text/html; charset=UTF-8'><head><title>Print</title></head><body ondblclick='window.print();' bgcolor='gray'>"+PSR_content+"</body></html>"); 
        PSR_f1.document.close(); 
        PSR_f1.focus(); 
        PSR_f1.document.close();
        }
        async function run05(){
          $("#page-container").html(page_print[0]);
          }  
          
       await run01();await run02();await run03();await run04();//await run05();
      }
     

  function  Print_Gtoup(){
    PSR_impriment2();
    var PSR_f1 = null; 
    var PSR_content=document.getElementById('print').parentNode.innerHTML; 
    if (PSR_f1) {if(!PSR_f1.closed) PSR_f1.close();} 
    PSR_f1 = window.open ('', 'PRINT', "height=650,width=900,top=100,left=150"); 
    PSR_f1.document.open(); 
    PSR_f1.document.write("<html><meta http-equiv='content-type' content='text/html; charset=UTF-8'><head><title>Print</title></head><body ondblclick='window.print();' bgcolor='gray'>"+PSR_content+"</body></html>"); 
    PSR_f1.document.close(); 
    PSR_f1.focus(); 
    PSR_f1.document.close();
   
  }

  function PSR_impr() { 
  PSR_impriment();
  var PSR_f1 = null; 
  var PSR_content=document.getElementById('print').parentNode.innerHTML; 
  if (PSR_f1) {if(!PSR_f1.closed) PSR_f1.close();} 
  PSR_f1 = window.open ('', 'PRINT', "height=650,width=900,top=100,left=150"); 
  PSR_f1.document.open(); 
  PSR_f1.document.write("<html><meta http-equiv='content-type' content='text/html; charset=UTF-8'><head><title>Print</title></head><body ondblclick='window.print();' bgcolor='gray'>"+PSR_content+"</body></html>"); 
  PSR_f1.document.close(); 
  
 //PSR_f1.document.getElementById('printSectionbordDRA').style.visibility='hidden'; 
  PSR_f1.focus(); 
 PSR_f1.document.close();
 //PSR_f1.print();
  
}
function getlas_ordre(){
  let act=$("#dot_all").val();
  if(act=="") {alert("select DOT");}
   $("#Nemuro_Ordre").val(ord);
   $("#ordre_group").val(ord);
 }
 
 function readAll() {
         var nordre=0,htm="<ul>",htm2="";
         $.ajax({
          type:"get",
          url:"/get-all",
          success: function(response)  
          {
             var data_t=JSON.parse(JSON.stringify(response));
             var data_ta=[],tabx=[];
             for(var i in data_t){
                Motife_s[i]=[data_t[i].Motif_mission, data_t[i].Destination];
                tabx[i]=data_t[i].Nemuro_Ordre;
                data_ta[i]={id:data_t[i].id,Nom_Prenom:data_t[i].Nom_Prenom ,Nemuro_Ordre:data_t[i].Nemuro_Ordre,
                Date_Ordre:data_t[i].Date_Ordre,Matricule:data_t[i].Matricule,Grade_Fonction:data_t[i].Grade_Fonction,
                Service_attache:data_t[i].Service_attache,Destination:data_t[i].Destination,Motif_mission:data_t[i].Motif_mission,
                Date_Depart:data_t[i].Date_Depart, Date_Retour:data_t[i].Date_Retour, Heure_Depart:data_t[i].Heure_Depart, Heure_Retour:data_t[i].Heure_Retour}
                htm+="<li><span style='color:cornflowerblue;font-weight: bold'>"+data_t[i].Nemuro_Ordre+"</span> : "+data_t[i].Nom_Prenom+" -- <span style='color:cornflowerblue;font-weight: bold;'>"+data_t[i].Date_Ordre+"</span></li>";
          
              }
             nordre=Math.max (...tabx); 
             ord=parseInt(nordre)+1
             htm+="</ul>"
             htm2="<label style='font-size:18px;color:#ec5109;margin:1px 1px 1px 23px;font-weight:bold;'>Nemuro Ordre Mission: "+nordre+"</label>"
             $("#Nemuro_Ordre").val(ord);
             sew_ordre=0;
             $('#listordre').html(htm); $('#listord').html(htm2);
             $('#demo3').html( '<table id="example" style="width:100%"  border="0" class="display" ></table>' );
            // console.dir(datas);
            var table=$('#example').dataTable( {
                                "aaData":data_ta,
                                "aoColumns": aoColumn2,
                                "sScrollY": "360px",
                                        "sScrollX": "500px",
                                        "aLengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                                        "bPaginate": true,
                                      
                                        lengthChange: true,
                                        dom: 'Bfrtip',
                                        buttons: [
                                            'copy'
                                        ]  
                            } );
                      
                       

                           $('#example tbody').on('click', 'tr', function () {
                              if ( $(this).hasClass('row_selected') ) {
                               $(this).removeClass('row_selected');
                           }
                           else {
                               table.$('tr.row_selected').removeClass('row_selected');
                               $(this).addClass('row_selected');
                               var rows = [];
                            $(this).find("td").each(function(cell,v) {
                           if (typeof rows[cell] === 'undefined') rows[cell] = [];
                           rows[cell]= $(this).html();
                           });
                           $("#id").val(rows[0]); $("#Date_Ordre").val(rows[2].split("/").reverse().join("-")); $("#Nemuro_Ordre").val(rows[1]);
                           $("#Nom_Prenom").val(rows[4]);$("#Matricule ").val(rows[3]);
                           $("#Grade_Fonction").val(rows[5]);$("#Service_attache").val(rows[6]);
                           $("#Destination").val(rows[7]);$("#Motif_mission").val(rows[8]);
                           $("#Date_Depart").val(rows[9].split("/").reverse().join("-"));$("#Heure_Depart").val(rows[10]);
                           $("#Date_Retour").val(rows[11].split("/").reverse().join("-"));$("#Heure_Retour").val(rows[12]);
                           sew_ordre=0;
                          }
                           });
                         
                          
           }
          })            
       }
      // idll=  $("#id").val();
   function fnFilterColumn ( i )
   {
      if(swith==1){ 
      switch(i){    
      case 1: $('#example').dataTable().fnFilter($("#get_annee").val(),i+1);break;
      case 2: $('#example').dataTable().fnFilter($("#get_mois").val(),i);break;
         }
       }
       else if(swith==0){
       }; 
   }
   
   function readAl2() {
    $.ajax({
      type:"get",
      url:"/get-all",
      success: function(response)  
      {
         var data_t=JSON.parse(JSON.stringify(response));
         var data_ta=[],tabx=[];
         for(var i in data_t){
            data_ta[i]={id:data_t[i].id,Nom_Prenom:data_t[i].Nom_Prenom ,Nemuro_Ordre:data_t[i].Nemuro_Ordre,
            Date_Ordre:data_t[i].Date_Ordre,Matricule:data_t[i].Matricule,Grade_Fonction:data_t[i].Grade_Fonction,
            Service_attache:data_t[i].Service_attache,Destination:data_t[i].Destination,Motif_mission:data_t[i].Motif_mission,
            Date_Depart:data_t[i].Date_Depart, Date_Retour:data_t[i].Date_Retour, Heure_Depart:data_t[i].Heure_Depart, Heure_Retour:data_t[i].Heure_Retour}
          }
             $('#loyee_data').html( '<table id="example2" style="width:100%" border="0" class="display" ></table>' );
            // console.dir(datas);
            var table=$('#example2').dataTable( {
                                "aaData":data_ta,
                                "aoColumns": aoColumn2,
                                "sScrollY": "400px",
                                        "sScrollX": "500px",
                                        "aLengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                                        "bPaginate": true

                            } );
                                                      
                    }
                  });                        
                                    

         }
      

   function readAll3() {
      add_datas=[];
      $.ajax({
        type:"get",
        url:"get-all2",
        success: function(response){
          var data_t=JSON.parse(JSON.stringify(response));
          for(var i in data_t){
          add_noms[i]={id:data_t[i].id,matricule:data_t[i].matricule ,nom:data_t[i].nom,
          service:data_t[i].service,grade:data_t[i].grade}
            }
            add_datas=add_noms;
           $('#loyee_data').html( '<table style="100%" class="display" id="dtBasi_inv2"></table>' );
             var table= $('#dtBasi_inv2').dataTable( {
                   "aaData":add_noms,
                   "aoColumns": aoColumn3,
                   "sScrollY": "400px",
                   "sScrollX": "100%",
                   "sScrollXInner": "100%",
                           "aLengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                           "bPaginate": true	
               } ); 
               var table = $('#dtBasi_inv2').DataTable();
                  table.MakeCellsEditable({
                   "onUpdate": myCallbackFunction,
                    
                    
                 }); 
                }
              });
              }
               

function loadFilesll(event) {
var fileName = document.getElementById("inputGroup").files[0].name;
var nextSibling = event.target.nextElementSibling;
nextSibling.innerText = fileName;
$("#loyee_data").html(""); 
$("#loyee_data").html('<table id="dtBasi_inv" class="display"  width="100%"></table>');
alasql('SELECT * FROM FILE(?,{headers:true})',[event],function(data){
  let datas=JSON.parse(JSON.stringify(data));
  data_tabs=data;
       $(document).ready(function () {
        $('#dtBasi_inv').dataTable( {
          "aaData":datas,
          "aoColumns": aoColumn2,
         // "aoColumns": aoColumnss,
          
          "sScrollY": "300px",
                  "sScrollX": "600px",
                  "bPaginate": true
      
      } );   
    } );   
});

} 
function loadFilesll2(event) {
var fileName = document.getElementById("inputGroup2").files[0].name;
var nextSibling = event.target.nextElementSibling;
nextSibling.innerText = fileName;

$("#loyee_data").html("");
$("#loyee_data").html('<table id="dtBasi_inv2"  class="display"  width="100%"></table>');
alasql('SELECT * FROM FILE(?,{headers:true})',[event],function(data){
  let datas=JSON.parse(JSON.stringify(data));
  data_tabs=data;
   $(document).ready(function () {
        $('#dtBasi_inv2').dataTable( {
          "aaData":datas,
          "aoColumns": aoColumn3,
          "sScrollY": "300px",
          "sScrollX": "600px",
          "bPaginate": true
      
      } );   
    } );   
});

} 


function getIndexOf(cell){
return [].indexOf.call(cell.parentElement.children, cell);
}    

   function add_all() {
     var confirmEdit = window.confirm("vous pouvez ajouter table data ?");
    if(confirmEdit){  
     $.ajax({
      type: "POST",
      url: "/add_agent",
      data:data_tabs,
      success:function(){

      }
     }) 
     }else{
      alert("not data add");
     }
    }
var ix=0;  
    function add_all4() {
     var talez={};
     add_all4:{ console.log([data_tabs[ix].nom])
         var talez={matricule:data_tabs[ix].matricule,nom:data_tabs[ix].nom,
         grade:data_tabs[ix].grade,service:data_tabs[ix].service}
         console.log(talez);

         $.ajax({
          type: "POST",
          url: "/add_agent",
          data:talez,
          success:function(){
          }
         }) ;
        
        $("#idl_3").html(ix+1 +"/"+data_tabs.length)
       if(ix==data_tabs.length) { 
       ix=0;    break add_all4;
          } 
          ix++;
          setTimeout( add_all4 ,200);
    
        }
        }
    function add_all2(){
      conEdit = window.confirm("vous pouvez ajouter table data ?");
      if(conEdit){  
      add_all4();
      }
     else{
      alert("not data add");
     }
  
    } 
      
    function add_all() {
      var confirmEdit = window.confirm("vous pouvez ajouter table data ?");
     if(confirmEdit){  
      $.ajax({
       type: "POST",
       url: "/add_agent",
       data:data_tabs,
       success:function(){
 
       }
      }) 
      }else{
       alert("not data add");
      }
     }
      
 function Repate_editall(){
 var confirmEdit = window.confirm("vous pouvez modefier table Ordre Mission?");
 if(confirmEdit){ 
   $("#example tbody").each(function(){
         var $table = $(this),
             $rows = $("tr", $(this));
             rows = [];
       $rows.each(function(row,v) {
         $(this).find("td").each(function(cell,v) {
           if (typeof rows[cell] === 'undefined') rows[cell] = [];
           rows[cell][row] = $(this).html();
           $table.prop("bodAry", rows);
         });
     
       });
       });
 //readAl2();
     }
} 
var ix2=0;
function Repate_editall2(){
 var confirmEdit = window.confirm("vous pouvez modefier table article?");
 if(confirmEdit){ 
  repat_edit();
 }
} 
function repat_edit(){
    $("#dtBasi_inv2 tbody").each(function(){
      var $table = $(this),
          $rows = $("tr", $(this));
          rows = [];
    $rows.each(function(row,v) {
      $(this).find("td").each(function(cell,v) {
        if (typeof rows[cell] === 'undefined') rows[cell] = [];
        rows[cell][row] = $(this).html();
        $table.prop("bodAry", rows);
      });
  
    });
    var talez={};
        var talez= {id:rows[0][ix2],matricule:rows[1][ix2],nom:rows[2][ix2],
        grade:rows[3][ix2],service:rows[4][ix2]}
        console.log("this",talez);
        $.ajax({
         type: "POST",
         url: "/edit_agent",
         data:talez,
         success:function(){
         }
        }) ;
      if(ix2==rows[0].length) { 
      ix2=0;  return  ;
         } 
         $("#idl_3").html(ix2+1 +"/"+rows[0].length)
     
         ix2++;
         setTimeout( repat_edit,200);
       

    });

   
}
function getgroupe(e){
  $("#"+e+" tbody").each(function(){
     row_group=[];
    var $table = $(this),
        $rows = $("tr", $(this));
        rows = [],roy=[];
  $rows.each(function(row,v) {
    $(this).find("td").each(function(cell,v) {
      if (typeof rows[cell] === 'undefined') rows[cell] = [];
      $table.prop("bodAry", rows);
   if($(this).find('input[type="text"]').prop("value")!==undefined) {
    var input= $(this).find('input[type="text"]').prop("value") ;
    rows[cell][row] =input;     
   }else{
    rows[cell][row] = $(this).html();
   }
     })
     });
     console.log(rows);
     row_group=rows;
    });
;}
function Edit(){
    var confirmEdit = window.confirm("vous pouvez modifier?");
    if(confirmEdit){ 
       var id=  $("#id").val();var Nemuro_Ordre=  $("#Nemuro_Ordre").val();var Date_Ordre=  $("#Date_Ordre").val().split("-").reverse().join("/");var Matricule=  $("#Matricule").val();var Nom_Prenom=  $("#Nom_Prenom").val();
       var Grade_Fonction=  $("#Grade_Fonction").val();var Service_attache=  $("#Service_attache").val();var Destination=  $("#Destination").val();var Motif_mission=  $("#Motif_mission").val();var Date_Depart=  $("#Date_Depart").val().split("-").reverse().join("/");
       if($("#Heure_Depart").val()!=="") var Heure_Depart=  $("#Heure_Depart").val();
       else  var Heure_Depart="--:--";
       if($("#Heure_Retour").val() !=="" )  var Heure_Retour=  $("#Heure_Retour").val();
       else   var Heure_Retour="--:--";
       if($("#Date_Retour").val()!=="") var Date_Retour=  $("#Date_Retour").val().split("-").reverse().join("/");
       else  var Date_Retour="--/--/----";    
       if(!Nemuro_Ordre || !Date_Ordre  || !Matricule  || !Nom_Prenom || !Grade_Fonction   || !Service_attache  || !Destination  
        || !Motif_mission  || !Date_Depart ){  alert("cade vide");return;}
      else{
        console.log("ok");
          $.ajax({
            type: "POST",  
            url: "/edit_ordre",
            data:{id:id, Nemuro_Ordre: Nemuro_Ordre, Date_Ordre: Date_Ordre, Matricule:Matricule, Nom_Prenom: Nom_Prenom
              ,Grade_Fonction: Grade_Fonction, Service_attache: Service_attache, Destination:Destination, Motif_mission: Motif_mission
              ,Date_Depart: Date_Depart, Heure_Depart: Heure_Depart, Date_Retour:Date_Retour, Heure_Retour: Heure_Retour} ,
            success: function(response)  
            {
              // data ok
            }
         })
         }
         readAll();readAll2();
        }else{
          alert('No data change');
        }
      }
     
   function Edit_all2(icersor,rows) {
    var transaction = db.transaction(["employee2"], "readwrite");
     var store = transaction.objectStore("employee2");
     var req = store.openCursor();
     req.onerror = function(event) {
     console.log("case if have an error");
     };
     
      req.onsuccess = function(event) {
       var cursor = event.target.result;
        if(cursor){
        if(cursor.value.id == rows[0][icersor]){//we find by id an user we want to update
                 var user = {};
                 user.id = rows[0][icersor] ;
                 user.matricule = rows[1][icersor];
                 user.nom = rows[2][icersor];
                 user.service = rows[3][icersor];
                 user.grade =rows[4][icersor];
                 var res = cursor.update(user);
                 res.onsuccess = function(e){
                 console.log("update success!!");
                 }
                 res.onerror = function(e){
                     console.log("update failed!!");
                 }
             }
             cursor.continue();//console.log(cursor.value);
              
            }
           else{
             console.log("fin mise a jour:"+icersor);
           }
              
             }
            
        }
 
    
function add(){
    var confirmEdit = window.confirm("vous pouvez ajouter article?");
    if(confirmEdit){ 
       var Nemuro_Ordre=  $("#Nemuro_Ordre").val();var Date_Ordre=  $("#Date_Ordre").val().split("-").reverse().join("/");var Matricule=  $("#Matricule").val();var Nom_Prenom=  $("#Nom_Prenom").val();
       var Grade_Fonction=  $("#Grade_Fonction").val();var Service_attache=  $("#Service_attache").val();var Destination=  $("#Destination").val();var Motif_mission=  $("#Motif_mission").val();var Date_Depart=  $("#Date_Depart").val().split("-").reverse().join("/");
       if($("#Heure_Depart").val()!=="") var Heure_Depart=  $("#Heure_Depart").val();
       else  var Heure_Depart="--:--";
       if($("#Heure_Retour").val() !=="" )  var Heure_Retour=  $("#Heure_Retour").val();
       else   var Heure_Retour="--:--";
       if($("#Date_Retour").val()!=="") var Date_Retour=  $("#Date_Retour").val().split("-").reverse().join("/");
       else  var Date_Retour="--/--/----";      
       if(!Nemuro_Ordre || !Date_Ordre  || !Matricule  || !Nom_Prenom || !Grade_Fonction   || !Service_attache  || !Destination
        || !Motif_mission  || !Date_Depart){  alert("cade vide");return;}
        else if(sew_ordre==0){alert("numéro odre mission incorrecte");return;}
       else{
        $.ajax({
          type: "POST",  
          url: "/add_ordre",
          data:{Nemuro_Ordre: Nemuro_Ordre, Date_Ordre: Date_Ordre, Matricule:Matricule, Nom_Prenom: Nom_Prenom
            ,Grade_Fonction: Grade_Fonction, Service_attache: Service_attache, Destination:Destination, Motif_mission: Motif_mission
            ,Date_Depart: Date_Depart, Heure_Depart: Heure_Depart, Date_Retour:Date_Retour, Heure_Retour: Heure_Retour} ,
          success: function(response)  
          {
            // data ok
          }
       })
       }

       readAll();readAll2();
      } else{
        alert('No data add');
      }
    }
    

    function remove() {
      var confirmEdit = window.confirm("vous pouvez supprime donne?");
      if(confirmEdit){ 
      var id =  $("#id").val();
     $.ajax({
       type: "POST",  
       url: "/dell_ordre",
       data:{id:id} ,
       success: function(response)  
       {
         //infoalert.innerHTML=htm;//   alert("data  ODS add");
       }   
     });
    }else{
      alert('No data change');
    }
       readAll();readAll2();
   }
      
    
      

var xport = {
_fallbacktoCSV: true,  
toXLS: function(tableId, filename) {   
  this._filename = (typeof filename == 'undefined') ? tableId : filename;
  
  //var ieVersion = this._getMsieVersion();
  //Fallback to CSV for IE & Edge
  if ((this._getMsieVersion() || this._isFirefox()) && this._fallbacktoCSV) {
    return this.toCSV(tableId);
  } else if (this._getMsieVersion() || this._isFirefox()) {
    alert("Not supported browser");
  }

  //Other Browser can download xls
  var htmltable = document.getElementById(tableId);
  var html = htmltable.outerHTML;

  this._downloadAnchor("data:application/vnd.ms-excel" + encodeURIComponent(html), 'xls'); 
},
toCSV: function(tableId, filename) {
  this._filename = (typeof filename === 'undefined') ? tableId : filename;
  // Generate our CSV string from out HTML Table
  var csv = this._tableToCSV(document.getElementById(tableId));
  // Create a CSV Blob
  var blob = new Blob([csv], { type: "text/csv" });

  // Determine which approach to take for the download
  if (navigator.msSaveOrOpenBlob) {
    // Works for Internet Explorer and Microsoft Edge
    navigator.msSaveOrOpenBlob(blob, this._filename + ".csv");
  } else {      
    this._downloadAnchor(URL.createObjectURL(blob), 'csv');      
  }
},
_getMsieVersion: function() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf("MSIE ");
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
  }

  var trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf("rv:");
    return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
  }

  var edge = ua.indexOf("Edge/");
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
  }

  // other browser
  return false;
},
_isFirefox: function(){
  if (navigator.userAgent.indexOf("Firefox") > 0) {
    return 1;
  }
  
  return 0;
},
_downloadAnchor: function(content, ext) {
    var anchor = document.createElement("a");
    anchor.style = "display:none !important";
    anchor.id = "downloadanchor";
    document.body.appendChild(anchor);

    // If the [download] attribute is supported, try to use it
    
    if ("download" in anchor) {
      anchor.download = this._filename + "." + ext;
    }
    anchor.href = content;
    anchor.click();
    anchor.remove();
},
_tableToCSV: function(table) {
  // We'll be co-opting `slice` to create arrays
  var slice = Array.prototype.slice;

  return slice
    .call(table.rows)
    .map(function(row) {
      return slice
        .call(row.cells)
        .map(function(cell) {
          return '"t"'.replace("t", cell.textContent);
        })
        .join(",");
    })
    .join("\r\n");
}
};

function myCallbackFunction(updatedCell, updatedRow, oldValue) {
console.log("The new value for the cell is: " + updatedCell.data());
console.log("The old value for that cell was: " + oldValue);
console.log("The values for each cell in that row are: " + updatedRow.data());
}
