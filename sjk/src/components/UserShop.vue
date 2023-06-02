<template>
    <div>
        <div class="header">
            欢迎点餐
        </div>
        <div class="body">
            <el-table :data="tableData" style="width: 100%" class="table" border>
                <el-table-column prop="rest_name" label="店铺名称" width="200" align="center">
                </el-table-column>
                <el-table-column prop="rest_price" label="产品单价" width="200" align="center">
                </el-table-column>
                <el-table-column prop="sale_count" label="月销量" width="200" align="center">
                </el-table-column>
                <el-table-column prop="operate" label="操作" width="208" align="center">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-plus" size="small" type="success" @click="showdia(scope.row)">订餐
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="订餐表单" :visible.sync="dialog" class="dialog" width="40%">
                <div>
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="店铺名称：">
                            <span>{{ form.rest_name }}</span>

                        </el-form-item>

                        <el-form-item label="产品单价：">
                            <span>{{ form.order_money }}</span>
                            
                        </el-form-item>


                        <el-form-item label="客户姓名：">
                            <span>{{ form.user_name }}</span>
                        </el-form-item>

                        <el-form-item label="客户电话">
                            <el-input v-model="form.user_tel"></el-input>
                        </el-form-item>

                        <el-form-item label="送餐地址：">
                            <el-input v-model="form.user_add"></el-input>
                        </el-form-item>

                    </el-form>
                    <div style="text-align: center;">
                        <el-button type="primary" @click="add">
                            提交
                        </el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    created() {
       // console.log(123);
        this.getdata();
    },
    data() {
        return {
            tableData: [],
            dialog: false,
            form: {
                rest_name: '',
                order_money: '',
                user_name: '',
                user_tel:'',
                user_add: '',
            }
        }
    },
    methods: {
        getdata() {
            this.$axios.get("/user/selectAll_rest").then((res) => {
                if (res.data.status == 200) {
                    this.tableData = res.data.data;
                }
            })
        },
        showdia(row) {
            this.form.user_name = localStorage.getItem('username');
            this.form.rest_name = row.rest_name;
            this.form.order_money = row.rest_price;
            this.dialog = true;
        },
        add() {
            this.$axios.post("/user/insert_o", this.form).then((res) => {
                
                if (res.data.status == 200) {
                    this.$message({
                        message: "成功下单",
                        type: "success"
                    })
                    this.dialog = false;
                    this.getdata();
                }
            })
        }
    }
}
</script>

<style scoped>
.header {
    width: 100%;
    height: 10%;
    text-align: center;
    line-height: 64px;
    font-size: 20px;
    font-weight: 800;
    border-bottom: 1px solid #e3e3e3;
}

.body {
    width: 63%;
    margin: auto;
    margin-top: 30px;
}

/* .table {
    margin-left: 120px;
} */

.dialog {
    /* width: 700px; */
}
</style>