<template>
    <div>
        <div class="header">
            个人信息
        </div>
        <div class="body">
            <el-form ref="form" :model="form" label-width="20%" id="selectForm">
                <el-form-item label="用户名：" prop="dispatcher_id">
                    <span>{{ form.username }}</span>
                    
                </el-form-item>
                <el-form-item label="性别：" prop="dispatcher_phone">
                    <span>{{ form.sex }}</span>
                    
                </el-form-item>
                <el-form-item label="电话：" prop="dispatcher_phone">
                    <span>{{ form.telephone }}</span>
                    
                </el-form-item>
            </el-form>
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
            form: {
                username: '',
                sex: '',
                telephone: ''
            },
            
        }
    },
    methods: {
        getdata() {
            this.form.username = localStorage.getItem('username');
            this.$axios.get("/user/select_all_user",{params:{username:this.form.username}}).then((res) => {
                //console.log(res.data);
                if (res.data.status == 200) {
                    this.form.username = res.data.data[0].username;
                    this.form.sex = res.data.data[0].sex;
                    this.form.telephone = res.data.data[0].telephone;
                }
            })
        }
    },
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
    width: 40%;
    /* margin: auto; */
    margin-top: 30px;
    margin-left: 30px;

}

#selectForm>>>.el-form-item__label {
    font-size: 18px;
}

span {
    font-size: 18px;
}
</style>