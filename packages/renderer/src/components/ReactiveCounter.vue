<script lang="ts" setup>
import type {State} from '../../../shared/reducers/index';
import {ref, onBeforeMount} from 'vue';

const counter = ref<number | undefined>();

const reduxtron = window.__electron_preload__reduxtron;

const onIncrement = () => reduxtron.dispatch({type: 'COUNTER:INCREMENT'});

onBeforeMount(async () => {
  const setCounter = (state: Partial<State>) => {
    console.log('setCounter', {state});
    counter.value = state.counter;
  };

  reduxtron.subscribe(setCounter);
  const state = await reduxtron.getState();
  setCounter(state);
});
</script>

<template>
  <button @click="onIncrement">count is: {{ counter }}</button>
</template>
