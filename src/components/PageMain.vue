<template>
  <div style="min-height: 600px" v-loading="loading">
    <el-card shadow="never" style="margin-bottom: 20px">
      <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px"></el-input>
      <el-button @click="search" icon="el-icon-search" style="margin-left: 10px" circle plain></el-button>
    </el-card>
    <div v-if="blogs && blogs.length > 0">
      <el-card shadow="hover" v-for="(item, index) in blogs" :keys="'p' + item.id" style="margin-bottom: 20px" v-if="!item.hide">
        <div slot="header">
          <el-row>
            <el-col :span="16">
              <span>
                <a style="text-decoration: none; cursor: pointer" @click="goDetails(item.id)">
                  <i class="el-icon-edit-outline"></i>&nbsp;&nbsp; {{ item.title }}
                </a>
              </span>
            </el-col>
            <el-col :span="8">
              <!-- <div style="text-align: right">
                <el-button @click="editBlog(index)" style="padding: 3px 0" type="text" icon="el-icon-edit"></el-button>
                <el-button @click="deleteBlog(index)" style="padding: 3px 0" type="text" icon="el-icon-delete"></el-button>
              </div> -->
            </el-col>
          </el-row>
        </div>
        <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
          最近更新 {{item.updateTime}}
        </div>
        <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px">
          {{item.description}}
        </div>
      </el-card>
      <div style="text-align: center">
        <el-pagination
          @current-change="list"
          background
          layout="prev, pager, next"
          :current-page.sync="query.page"
          :page-size="query.pageSize"
          :total="query.pageNumber*query.pageSize"
        ></el-pagination>
      </div>
    </div>
    <el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-if="!blogs||blogs.length==0">
      <font style="font-size: 30px;color:#dddddd ">
        <b>还没有博客</b>
      </font>
    </el-card>
  </div>
</template>

<script>
  import GistApi from '../api/gist';

  export default {
    name: 'PageMain',
    data () {
      return {
        query: {
          page: 1,
          pageSize: 5,
          pageNumber: 1,
        },
        loading: false,
        searchKey: '',
        blogs: []
      }
    },
    mounted () {
      this.list();
    },
    methods: {
      list () {
        this.blogs = [];
        this.loading = true;
        GistApi.list(this.query).then((response) => {
          console.log(response, 'response');
          let result = response.data;
          let pageNumber = this.$util.parseHeaders(response.headers);
          if (pageNumber) {
            this.query.pageNumber = pageNumber;
          }
          for (let i = 0; i < result.length; i++) {
            for (let key in result[i].files) {
              let data = {};
              data['title'] = key
              data['url'] = result[i].files[key]
              data['description'] = result[i]['description']
              data['id'] = result[i]['id']
              data['createTime'] = this.$util.utcToLocal(result[i]['created_at'])
              data['updateTime'] = this.$util.utcToLocal(result[i]['updated_at'])
              data['hide'] = false
              this.blogs.push(data)
              break;
            }
          }
        }).then(() => {
          this.loading = false;
        })
      },
      search () {
        for (let i = 0; i < this.blogs.length; i++) {
          this.blogs[i].hide = this.blogs[i].title.indexOf(this.searchKey) < 0;
        }
      },
      editBlog () {
        alert('编辑博客');
      },
      deleteBlog (index) {
        this.$confirm('是否永久删除该博客？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let blog = this.blogs[index];
          GistApi.delete(blog.id).then((result) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.blogs.splice(index, 1);
          })
        })
      },
      goAdd () {
        alert('去添加')
      },
      goDetails () {
        alert('去详情');
      }
    }
  }
</script>

<style>
  
</style>