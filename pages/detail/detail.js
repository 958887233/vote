//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    createFace: '/images/common/vote.jpeg',
    detailImg: '/images/common/vote.jpeg',
    // radioItems: [
    //     {name: '选项1', value: '0'},
    //     {name: '选项2', value: '1'},
    //     {name: '选项3', value: '2'},
    //     {name: '选项4', value: '3'},
    //     {name: '选项5', value: '4'}
    // ],
    checkboxMax: 2,
    progress: 0,
    disabled: false
  },
  onLoad: function (option) {
    console.log(option.pk)
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
        radioItems: radioItems
    });
  },
    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);

        

        let checkboxItems = this.data.checkboxItems;
        let checkboxMax = this.data.checkboxMax;
        
        let values = e.detail.value;

        if( checkboxMax < values.length  ) {
            values = values.splice(0, checkboxMax);


            console.log(values)

            for ( let j = 0; j <  checkboxItems.length; j++) {
                checkboxItems[j].checked = false;

                for (let i = 0; i < values.length; i++){
                    if ( checkboxItems[j].value ==  values[i]) {
                        checkboxItems[j].checked = true;
                    }
                }
            }

            console.log(checkboxItems)

        }else {
            for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
                checkboxItems[i].checked = false;

                for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                    if(checkboxItems[i].value == values[j]){
                    
                        checkboxItems[i].checked = true;
                        break;
                    }
                }
            }
        }

        this.setData({
            checkboxItems: checkboxItems
        });

    },
    upload: function(){
        if(this.data.disabled) return;

        this.setData({
            progress: 0,
            disabled: true
        });
        _next.call(this);
    }
})
