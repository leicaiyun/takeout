<template>
    <div>
        <div class="header">
            店铺管理
        </div>
        <div class="body">
            <el-table :data="tableData" style="width: 89%" class="table">
                <el-table-column prop="rest_name" label="店铺名称" width="200" align="center">
                </el-table-column>
                <el-table-column prop="rest_price" label="产品单价" width="200" align="center">
                </el-table-column>
                <el-table-column prop="sale_count" label="月销量" width="200" align="center">
                </el-table-column>
                <el-table-column prop="operate" label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="warning" @click="showdia_chg(scope.row)">修改
                        </el-button>

                        <el-button size="small" type="danger" @click="showdia_dlt(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column width="120" align="center">
                    <template slot="header">
                        <el-button icon="el-icon-plus" size="small" type="success" @click="showdia_add()">添加店铺
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="添加店铺" :visible.sync="dia_add" width="30%">
                <el-form ref="add_form" :model="add_form" label-width="100px" :rules="add_form_rules">
                    <el-form-item label="店铺名称：" prop="rest_name">
                        <el-input v-model="add_form.rest_name"></el-input>
                    </el-form-item>
                    <el-form-item label="产品单价：" prop="rest_price">
                        <el-input v-model="add_form.rest_price"></el-input>
                    </el-form-item>
                    <el-form-item label="月销量：" prop="sale_count">
                        <el-input v-model="add_form.sale_count"></el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align: center;">
                    <el-button type="primary" @click="addshop()">
                        添加
                    </el-button>
                </div>
            </el-dialog>

            <el-dialog title="修改店铺" :visible.sync="dia_chg" width="30%">
                <el-form ref="form" :model="chg_form" label-width="100px">
                    <el-form-item label="店铺名称：">
                        <span>{{ chg_form.rest_name }}</span>
                    </el-form-item>
                    <el-form-item label="产品单价：">
                        <el-input v-model="chg_form.rest_price"></el-input>
                    </el-form-item>
                    <el-form-item label="月销量：">
                        <el-input v-model="chg_form.sale_count"></el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align: center;">
                    <el-button type="primary" @click="changeshop()">
                        修改
                    </el-button>
                </div>
            </el-dialog>
            <el-dialog title="删除店铺" :visible.sync="dia_dlt" width="30%">
                <div>
                    确定删除此店铺吗？
                </div>
                <div style="text-align: center;">
                    <el-button type="primary" @click="deleteshop()">
                        确定
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
            dia_add: false,
            dia_chg: false,
            dia_dlt: false,
            add_form: {
                rest_name: '',
                rest_price: '',
                sale_count: '',
                action: "add",
            },
            chg_form: {
                rest_name: '',
                rest_price: '',
                sale_count: '',
                action: "change",
            },
            want_delete: '',
            add_form_rules: {
                rest_name: [{ required: true, message: '必填项', trigger: 'blur' }],
                rest_price: [{ required: true, message: '必填项', trigger: 'blur' }],
                sale_count: [{ required: true, message: '必填项', trigger: 'blur' }]

            }
        }
    },
    methods: {
        getdata() {
            this.$axios.get("/manager/selectAll_rest").then((res) => {
                //console.log(res.data,111);

                if (res.data.status == 200) {
                    this.tableData = res.data.data;
                }
            })
        },
        showdia_add() {
            this.dia_add = true;
        },
        addshop() {
            this.$refs.add_form.validate(valid => {
                if (!valid)
                    return;
                else //验证通过再发送请求
                    this.$axios.post("/manager/addRest", this.add_form).then((res) => {
                        //console.log(res.data);
                        if (res.data.status == 200) {
                            this.$message({
                                message: "添加成功",
                                type: "success"
                            })
                            this.dia_add = false;
                            this.getdata();
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: "error"
                            })
                        }
                    })
            })


        },
        showdia_chg(row) {
            this.chg_form.rest_name = row.rest_name;
            this.chg_form.rest_price = row.rest_price;
            this.chg_form.sale_count = row.sale_count;
            this.dia_chg = true;
        },
        changeshop() {
            this.$axios.post("/manager/writeRest", this.chg_form).then((res) => {
                //console.log(res.data);
                if (res.data.status == 200) {
                    this.$message({
                        message: "修改成功",
                        type: "success"
                    })
                    this.dia_chg = false;
                    this.getdata();
                }else{
                    this.$message({
                        message: "修改失败",
                        type: "error"
                    })
                }
            })
        },
        showdia_dlt(row) {
            this.want_delete = row.rest_name;
            this.dia_dlt = true;
        },
        deleteshop() {
            this.$axios.post("/manager/shutRest", {rest_name:this.want_delete}).then((res) => {
                if (res.data.status == 200) {
                    this.$message({
                        message: res.data.meg,
                        type: "success"
                    })
                    this.getdata()
                    this.dia_dlt = false
                }else{
                    this.$message({
                        message: res.data.meg,
                        type: "error"
                    })
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

    width: 80%;
    margin: auto;
    margin-top: 30px;
}
</style>