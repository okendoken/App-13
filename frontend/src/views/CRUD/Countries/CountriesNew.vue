<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useCountriesStore } from "@/stores/Countries/countries";
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const countriesStore = useCountriesStore()
const router = useRouter();

const notification = computed(() => countriesStore.notify)
const titleStack = ref(['Admin', 'Countries'])

const form = reactive({

      name: '',

})

onBeforeMount(async () => {

})

const submit = async () => {
  try {

    await countriesStore.newItem({ ...form })
    router.push('/countries');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.name = '';

}

const cancel = () => {
  router.push('/users')
}

watch(() => countriesStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Countries notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    countriesStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Countries</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Countries"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="Name"
    >
      <FormControl
        v-model="form.name"
        placeholder="Your Name"
      />
    </FormField>

    <BaseDivider />

    <BaseButtons>
      <BaseButton
        type="submit"
        color="info"
        label="Submit"
      />
      <BaseButton
        type="reset"
        color="info"
        outline
        label="Reset"
        @click="reset"
      />
      <BaseButton
        type="cancel"
        color="danger"
        outline
        label="Cancel"
        @click="cancel"
      />
    </BaseButtons>
  </CardBox>
</SectionMain>

</template>
