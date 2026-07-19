<template>
  <Dialog
    v-model="open"
    :options="{
      title: __('Create a Folder'),
      size: 'xs',
      actions: [
        {
          label: __('Create'),
          variant: 'solid',
          disabled: folderName.length === 0,
          loading: createFolder.loading,
          onClick: submit,
        },
      ],
    }"
    @close="dialogType = ''"
  >
    <template #body-content>
      <FormControl
        v-model="folderName"
        v-focus
        :label="__('Name:')"
        @keyup.enter="submit"
        @keydown="createFolder.error = null"
      >
        <template #prefix>
          <LucideFolderClosed class="size-4" />
        </template>
      </FormControl>
      <div
        v-if="createFolder.error"
        class="pt-4 text-base font-sm text-ink-red-3"
      >
        {{ createFolder.error.messages?.[0] || createFolder.error.message }}
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref } from "vue"
import { Dialog, createResource } from "frappe-ui"
import { useRoute } from "vue-router"

const route = useRoute()
const props = defineProps({
  parent: String,
})
const emit = defineEmits(["success"])

const dialogType = defineModel()
const open = ref(true)

const folderName = ref("")

const createFolder = createResource({
  url: "drive.api.files.create_folder",
  makeParams(title) {
    return {
      title,
      team: route.params.team,
      parent: props.parent,
    }
  },
  validate(params) {
    if (!params?.title) {
      return "Folder name is required"
    }
  },
  onSuccess(data) {
    open.value = false
    emit("success", data)
  },
})
// Guard against double-submit: Enter on the input and the Create button both
// call this, and `loading` only disables the button — on a slow link the
// second trigger lands before the first response and creates the folder twice.
// The empty-name guard matters too: the Create button is disabled when empty,
// but Enter still reaches here → validate() returns a string → frappe-ui
// throws a bare Error with no `.messages`, which the template's
// `error.messages[0]` then crashes on, blanking the dialog body.
const submit = () => {
  if (createFolder.loading || !folderName.value.trim()) return
  createFolder.submit(folderName.value.trim())
}
</script>
