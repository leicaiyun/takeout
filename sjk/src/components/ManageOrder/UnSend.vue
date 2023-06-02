<template>
    <div>
        <div class="header">
            未发货订单
        </div>
        <div class="body">
            <el-table :data="tableData" style="width: 100%" class="table" border>
                <el-table-column prop="order_id" label="订单编号" width="80" align="center">
                </el-table-column>
                <el-table-column prop="rest_name" label="店铺" width="100" align="center">
                </el-table-column>
                <el-table-column prop="order_money" label="订单价格" width="80" align="center">
                </el-table-column>
                <el-table-column prop="user_tel" label="订餐人电话" width="200" align="center">
                </el-table-column>
                <el-table-column prop="user_name" label="订餐人姓名" width="100" align="center">
                </el-table-column>
                <el-table-column prop="user_add" label="取餐地址" width="200" align="center">
                </el-table-column>
                <el-table-column prop="operate" label="派发订单" width="127" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="success" @click="show_dialog(scope.row)">派发此订单
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="派发订单" :visible.sync="dialog" width="30%">
                <el-form ref="form" :model="form" label-width="120px">

                    <el-form-item label="选择送餐员：" prop="">
                        <el-select v-model="form.dm_id" placeholder="请选择送餐员编号">

                            <el-option v-for="(item, index)  in dm_range" :key="index" :label="item.dm_id"
                                :value="item.dm_id"></el-option>
                        </el-select>

                    </el-form-item>
                </el-form>
                <div style="text-align: center;">
                    <el-button type="primary" @click="add()">
                        确定派发
                    </el-button>
                </div>
            </el-dialog>

        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.getdata()
    },
    data() {
        return {
            tableData: [],
            dialog: false,
            form: {
                order_id:'',
                user_name:'',
                dm_id: '',
            },
            dm_range: [],
        }
    },
    methods: {
        getdata() {
            this.$axios.get("/manager/selectAll0_o").then((res) => {
                if (res.data.status == 200) {
                    this.tableData = res.data.data;
                }
            }),
            this.$axios.get("/manager/seekId_dm").then((res)=>{
                
                if (res.data.status == 200) {
                    this.dm_range = res.data.data;
                }
                //console.log(this.dm_range);
            })
        },
        show_dialog(row) {
            this.form.order_id = row.order_id;
            this.form.user_name = row.user_name;
            this.dialog = true;
        },
        add() {
            this.$axios.post("/manager/insert_d", this.form).then((res) => {
                if (res.data.status == 200) {
                    this.$message({
                        message: res.data.meg,
                        type: "success"
                    })
                    this.dialog = false;
                    this.getdata();
                }else{
                    this.$message({
                        message: res.data.meg,
                        type: "error"
                    })
                    this.dialog = false;
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

    width: 91%;
    margin: auto;
    margin-top: 30px;
}
</style>