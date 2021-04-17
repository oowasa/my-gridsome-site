
<template>
    <div>
        <el-card shadow="never">
            <el-menu :default-active="active" @select="onSelect">
                <!-- <el-menu-item v-for="item in constantRouterMap" v-if="item.meta&&item.meta.type=='user'&&(token||!item.meta.LoginRequired)&&(!mini||!item.meta.mini)"
                    :key="item.path" :index="item.path">
                    <i :class="item.meta.icon"></i>
                    <span slot="title">{{item.meta.title}}</span>
                </el-menu-item> -->
            </el-menu>
        </el-card>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { constantRouterMap } from ''
    export default {
        components: {},
        data() {
            return {
                constantRouterMap,
                active: "",
                parentUrl: "",
                menuList: []
            }
        },
        computed: {
            ...mapGetters([
                'token',
                'githubUsername',
                'mini'
            ])
        },
        mounted() {
            let arr = this.$route.path.split("/")
            this.active = "/" + arr[1] + "/" + arr[2]
        },
        methods: {
            onSelect(index) {
                this.$router.push(index)
            },
            cancellation() {
                this.$store.dispatch("Cancellation")
            }
        }
    }
</script>