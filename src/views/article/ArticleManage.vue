<script setup>
import { Edit, Delete } from "@element-plus/icons-vue";

import { ref } from "vue";

//文章分类数据模型
const categorys = ref([
  {
    id: 3,
    categoryName: "美食",
    categoryAlias: "my",
    createTime: "2023-09-02 12:06:59",
    updateTime: "2023-09-02 12:06:59",
  },
  {
    id: 4,
    categoryName: "娱乐",
    categoryAlias: "yl",
    createTime: "2023-09-02 12:08:16",
    updateTime: "2023-09-02 12:08:16",
  },
  {
    id: 5,
    categoryName: "军事",
    categoryAlias: "js",
    createTime: "2023-09-02 12:08:33",
    updateTime: "2023-09-02 12:08:33",
  },
]);

//用户搜索时选中的分类id
const categoryId = ref("");

//用户搜索时选中的发布状态
const state = ref("");

//文章列表数据模型
const articles = ref([
  /* {
    id: 5,
    title: "陕西旅游攻略",
    content: "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
    coverImg:
      "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
    state: "草稿",
    categoryId: 2,
    createTime: "2023-09-03 11:55:30",
    updateTime: "2023-09-03 11:55:30",
  },
  {
    id: 5,
    title: "陕西旅游攻略",
    content: "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
    coverImg:
      "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
    state: "草稿",
    categoryId: 2,
    createTime: "2023-09-03 11:55:30",
    updateTime: "2023-09-03 11:55:30",
  },
  {
    id: 5,
    title: "陕西旅游攻略",
    content: "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
    coverImg:
      "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
    state: "草稿",
    categoryId: 2,
    createTime: "2023-09-03 11:55:30",
    updateTime: "2023-09-03 11:55:30",
  }, */
]);

//分页条数据模型
const pageNum = ref(1); //当前页
const total = ref(20); //总条数
const pageSize = ref(3); //每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size;
  articleList();
};
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num;
  articleList();
};

// 调用文章分类列表查询接口，覆盖调文章分类数据模型
import {
  articleCategoryListService,
  articleListService,
  articleAddService,
} from "@/api/article.js";
const articleCategoryList = async () => {
  let result = await articleCategoryListService();
  categorys.value = result.data;
};
articleCategoryList();

// 调用获取文章列表接口
const articleList = async () => {
  let params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    categoryId: categoryId.value ? categoryId.value : null,
    state: state.value ? state.value : null,
  };
  let result = await articleListService(params);

  // 渲染视图
  total.value = result.data.total;
  articles.value = result.data.items;
  // 处理数据，给数据模型扩展一个属性categoryName：分类名称
  for (let i = 0; i < articles.value.length; i++) {
    let article = articles.value[i];
    for (let j = 0; j < categorys.value.length; j++) {
      if (article.categoryId === categorys.value[j].id) {
        article.categoryName = categorys.value[j].categoryName;
      }
    }
  }
};

articleList();

// 重置恢复默认，清除搜索数据
const clearSeacherData = () => {
  categoryId.value = "";
  state.value = "";
  pageNum.value = 1;
  pageSize.value = 3;
  articleList();
};

import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
//控制抽屉是否显示
const visibleDrawer = ref(false);
//添加表单数据模型
const articleModel = ref({
  title: "",
  categoryId: "",
  coverImg: "",
  content: "",
  state: "",
});

// 富文本编辑器quill
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

// import axios from 'axios'
const upload = (param) => {
  const formData = new FormData();
  formData.append("file", param.file);
  const url = "/upload";
  fetch(url, {
    method: "post",
    body: formData,
    headers: {
      Origin: "https://telegra.ph",
      Referer: "https://telegra.ph",
    },
  })
    .then((response) => {
      response.text();
      console.log("请求成功", response);
      console.log("请求成功", response.body);
    })
    .then((data) => {
      console.log("数据：", data);
    })
    .catch((error) => {
      console.log(error);
    });
  // axios.post(url, formData).then(response => {
  //   console.log('上传图片成功')
  // }).catch(error => {
  //   console.log('图片上传失败')
  // })
};

// 上传图片:上传成功的回调
const uploadSuccess = (result) => {
  url = "https://telegra.ph/" + result[0]["src"];
  console.log(url);
  articleModel.value.coverImg = url;
};

// 调用添加文章接口
const articleAdd = async () => {
  let result = await articleAddService(articleModel.value);
  ElMessage.success(result.message ? result.message : "添加成功");
};
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>文章管理</span>
        <div class="extra">
          <el-button type="primary" @click="visibleDrawer = true"
            >添加文章</el-button
          >
        </div>
      </div>
    </template>
    <!-- 搜索表单 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <el-select placeholder="请选择" v-model="categoryId">
          <el-option
            v-for="c in categorys"
            :key="c.id"
            :label="c.categoryName"
            :value="c.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select placeholder="请选择" v-model="state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="articleList">搜索</el-button>
        <el-button @click="clearSeacherData">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 文章列表 -->
    <el-table :data="articles" style="width: 100%">
      <el-table-column
        label="文章标题"
        width="400"
        prop="title"
      ></el-table-column>
      <el-table-column label="分类" prop="categoryName"></el-table-column>
      <el-table-column label="发表时间" prop="createTime"> </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary"></el-button>
          <el-button :icon="Delete" circle plain type="danger"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!-- 分页条 -->
    <el-pagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 10, 15]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <!-- 抽屉 -->
    <el-drawer
      v-model="visibleDrawer"
      title="添加文章"
      direction="rtl"
      size="50%"
    >
      <!-- 添加文章表单 -->
      <el-form :model="articleModel" label-width="100px">
        <el-form-item label="文章标题">
          <el-input
            v-model="articleModel.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章分类">
          <el-select placeholder="请选择" v-model="articleModel.categoryId">
            <el-option
              v-for="c in categorys"
              :key="c.id"
              :label="c.categoryName"
              :value="c.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章封面">
          <el-upload
            class="avatar-uploader"
            :auto-upload="true"
            :show-file-list="false"
            action="/upload"
            name="file"
            :on-success="uploadSuccess"
          >
            <!-- :http-request="upload" -->
            <img
              v-if="articleModel.coverImg"
              :src="articleModel.coverImg"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章内容">
          <!-- <div class="editor">富文本编辑器</div> -->
          <div class="editor">
            <form
              action="https://telegra.ph/upload"
              method="post"
              enctype="multipart/form-data"
            >
              <input type="file" name="fileToUpload" id="fileToUpload" />
              <input type="submit" value="上传" name="submit" />
            </form>
            <quill-editor
              theme="snow"
              v-model:content="articleModel.content"
              contentType="html"
            >
            </quill-editor>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发布</el-button>
          <el-button type="info">草稿</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

/* 抽屉样式 */
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 120px;
  }
}
</style>
