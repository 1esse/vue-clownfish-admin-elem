<script setup lang="ts">
import { reactive, ref } from 'vue'
import { appTitle } from '@/appConfig'
import { userStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import type { ComponentPublicInstance } from 'vue'
import type { FormInstance } from 'element-plus'

interface LoginForm {
  username: string
  password: string
  remember: boolean
  showPassword: boolean
}

const refForm = ref<ComponentPublicInstance<FormInstance> | null>(null)
const form = reactive<LoginForm>({
  username: 'david',
  password: '123456',
  showPassword: false,
  remember: true
})
const loading = reactive({
  login: false
})
const router = useRouter()
const user = userStore()

function login() {
  if (!refForm.value) return
  refForm.value.validate((valid, fields) => {
    if (!valid) return false
    loading.login = true
    user.login(form.username, form.password).then(_ => {
      router.replace('/dashboard')
    }).catch(err => {
      loading.login = false
      ElMessage.error(err)
    })
  })
}
</script>

<template>
  <main class="main">
    <section class="login-wrapper">
      <h2 class="title">{{ appTitle }} Login</h2>
      <el-form ref="refForm" label-width="0" :model="form" class="login-form shadow" size="large">
        <el-form-item prop="username" :rules="[{ required: true, message: '用户名不能为空!' }]">
          <el-input v-model="form.username">
            <template #prefix>
              <el-icon size="1.1rem">
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" :rules="[{ required: true, message: '密码不能为空!' }]">
          <el-input v-model="form.password" :type="form.showPassword ? 'text' : 'password'">
            <template #prefix>
              <el-icon size="1.1rem">
                <Lock />
              </el-icon>
            </template>
            <template #suffix>
              <el-icon size="1.1rem">
                <SvgIcon :iconName="form.showPassword ? 'eye-open' : 'eye'"
                  @click="form.showPassword = !form.showPassword"></SvgIcon>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="remember" style="margin-bottom: .5rem;">
          <el-checkbox v-model="form.remember" label="记住我" />
        </el-form-item>
        <ElButton type="primary" style="width: 100%;" size="large" :loading="loading.login" @click="login">登录
        </ElButton>
      </el-form>
    </section>
  </main>
</template>
<style scoped lang="postcss">
.main {
  background-image: linear-gradient(-170deg, #44cee9, #2b74c1);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & .login-wrapper {
    margin-top: -10rem;

    & .title {
      color: var(--white);
      text-align: center;
      margin-bottom: 1rem;
    }

    & .login-form {
      background-color: var(--white);
      padding: 2rem 1.5rem;
      width: 25rem;
      border-radius: .5rem;

      & .wrapper-remember {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>