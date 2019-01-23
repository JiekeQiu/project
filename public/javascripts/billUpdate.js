$(() => {
    let id = location.search
    id = id.slice(4);
    $('#baocun').on('click', () => {
        let val1 = $('#providerId').val();
        let val2 = $('#providerName').val();
        let val3 = $('#people').val();
        let val4 = $('#phone').val();
        let val5 = $('#address').val();
        let getList = () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: 'GET',
                    url: "http://localhost:3000/setting/billList",
                    success(data) {
                        resolve(data);
                        // console.log(data);
                    }
                })
            })
        };
        (async () => {
            let data = await getList();
            for (var i = 0; i < data.length; i++) {
                if (data[i]._id === id) {
                    let updataList = (name, asupplierge, price, pay, time) => {
                        return new Promise((resolve, reject) => {
                            $.ajax({
                                type: 'GET',
                                url: "http://localhost:3000/setting/billUpdate",
                                data: {
                                    id,
                                    val1,
                                    val2,
                                    val3,
                                    val4,
                                    val5
                                },
                                success(data) {
                                    resolve(data);
                                    console.log(data);
                                }
                            })
                        })
                    }
                    (async () => {

                        let data = await updataList(val1, val2, val3, val4, val5);
                        console.log(data);
                    })();
                }
            }
        })();
    })

    

})