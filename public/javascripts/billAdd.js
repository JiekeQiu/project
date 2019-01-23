$('#tianjia').on('click', () => {
    let addlist = (name,asupplierge,price,pay,time) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: "http://localhost:3000/setting/billAdd",
                data: {
                    name,
                    asupplierge,
                    price,
                    pay,
                    time
                },
                success(data) {
                    resolve(data);
                    console.log(data);
                }
            })
        })
    }
    (async ()=>{
        let val1 = $('#billId').val();
        let val2 = $('#billName').val();
        let val3 = $('#billCom').val();
        let val4 = $('#billNum').val();
        let val5 = $('#money').val();
        let data = await addlist(val1,val2,val3,val4,val5);
    })();
})