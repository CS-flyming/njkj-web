<style lang="less">
.minWidth {
    min-width: 43.3% !important;
}
.inputWidth {
    min-width: 13rem;
}
</style>
<template>
    <div>
        <Card class="filter-wrap">
            <P>管理员权限管理详情</P>
            <Form label-position="right" :label-width="200">
                <FormItem label="管理员姓名" class="minWidth">
                    <Input v-model="form" class="inputWidth"></Input>      
                </FormItem>
                <FormItem label="管理员手机"  class="minWidth">
                    <Input v-model="form" class="inputWidth"></Input>
                </FormItem>                
               <FormItem label="所属渠道" class="minWidth">
                    <Input v-model="form" class="inputWidth"></Input>
                </FormItem>  
                <FormItem label="对账开始时间" class="minWidth">
                    <Input v-model="form" class="inputWidth"></Input>
                </FormItem> 
            </Form>
        </Card>
    </div>
</template>

<script>
import { getAgentManagerRoleDetail } from "@/actions/agent";
export default {
    name: "reconcile-batch-detail",
    data() {
        return {
            form: {},
            checkingCountList: []
        };
    },
    activated() {
        let { id } = his.$route.query;
        if (this.form.agentManagerId != id) {
            getAgentManagerRoleDetail(id).then(res => {
                this.form = res.data;
            });
        }
    }
};
</script>

