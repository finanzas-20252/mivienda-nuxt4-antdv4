<script setup lang="ts">
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

definePageMeta({
  layout: "login",
});

const auth = getAuth();
const loading = ref(false);

interface FormState {
  email: string;
  password: string;
  remember: boolean;
}
const formState = reactive<FormState>({
  email: "",
  password: "",
  remember: true,
});

const handleFinish = async (values: any) => {
  try {
    loading.value = true;
    const response = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    notificationSuccess("Bienvenido " + response.user.email);
  } catch (error: any) {
    modalError(error.message);
  } finally {
    loading.value = false;
  }
};

const disabled = computed(() => {
  return !(formState.email && formState.password);
});

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
</script>
<template>
  <div class="flex flex-col h-screen">
    <div class="mx-auto">
      <a-card class="w-[500px] shadow-md mt-28">
        <h1 class="text-center">Iniciar sesión</h1>
        <a-form :model="formState" v-bind="layout" @finish="handleFinish">
          <a-form-item
            label="Email"
            name="email"
            :rules="[{ required: true, message: 'Ingresar email!' }]"
          >
            <a-input v-model:value="formState.email" type="email">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            label="Contraseña"
            name="password"
            :rules="[{ required: true, message: 'Ingresar contraseña!' }]"
          >
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item name="remember" :wrapper-col="{ span: 14, offset: 6 }">
            <a-checkbox v-model:checked="formState.remember">
              Recordarme
            </a-checkbox>
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 14, offset: 6 }">
            <a-button
              :disabled="disabled"
              type="primary"
              html-type="submit"
              class="login-form-button w-full"
              :loading="loading"
            >
              Iniciar sesión
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>
