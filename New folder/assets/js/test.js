$('#table-fac tbody').on('click', 'td', function(event){
    var data = {
        activeCell: null,
        selects: {},
        selectCols: [],
        isSelector: false,
        defalutInput: null
    };
    var input = wrapper.find('input');
    data.defalutInput = input[0];
    var cell = event.target;
    var index = getIndexOf(cell);
    if(data.activeCell){//在移动input之前更新cell的值为input的值
        var inputValue = input.val();
        //data.activeCell.innerHTML = inputValue;
        console.log(inputValue,index,data.defalutInput);
        
    }
})