import { reactive } from 'vue';

export const loadingState = reactive({
  singal: 0,
  content: '',
  mask: false,
});

export function showGlobalLoading(content = '', mask = true) {
  loadingState.singal++;
  loadingState.mask = mask;
  loadingState.content = content;
}

export function hideGlobalLoading() {
  loadingState.content = '';
  loadingState.singal = 0;
}
