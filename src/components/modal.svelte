<script lang="ts">
  import { modalRemovingTime } from "$lib/constants";
  import headerBg from "$lib/assets/header-bg.svg";
  import { SET_MODAL, MODAL_CONTEXT } from "$lib/context/store";
  import PasswordModal  from '$compo/modals/password-modal.svelte'
  import ConfirmPasswordChange from "$compo/modals/confirm-password-change.svelte";
  import AnnouncmentsModel from "$compo/modals/announcments-model.svelte";
  import ItemView from "./modals/item-view.svelte";
  let closeModal: boolean = false;
  const handleCloseModal = (isClosing:boolean) => {
    if(isClosing === true){
      closeModal = true;
      setTimeout(() => SET_MODAL({show:false}), modalRemovingTime);
    }
  };
  $:$MODAL_CONTEXT.isClosing, handleCloseModal($MODAL_CONTEXT.isClosing) 
</script>

<div class="modal-x" on:mousedown={()=>handleCloseModal(true)}>
  <div class={!closeModal ? "full-size modal-x-bg  dfc-c" : "full-size dfc-c"}>
    <div
      on:mousedown={(e) => e.stopPropagation()}
      class={closeModal === false ? "fade-in-eff" : "fade-out-eff"}
    >
      <div  class="modal-x-body bg-w c-b fade-in-eff">
          <img class="modal-x-title-bg" src={headerBg} alt="bg" />
        <div>
          <div class="modal-x-title modal-x-sup dfc-r jc-sb">
            <div
              class="modal-close"
              title="close modal"
              on:mousedown={()=>handleCloseModal(true)}
            >
              <span class="times">&times;</span>
            </div>
          </div>
          <div>
            {#if $MODAL_CONTEXT.children === 'password-modal'} <PasswordModal/> {/if}
            {#if $MODAL_CONTEXT.children === 'confirm-password-change'} <ConfirmPasswordChange/> {/if}
            {#if $MODAL_CONTEXT.children === 'announcments'} <AnnouncmentsModel/> {/if}
            {#if $MODAL_CONTEXT.children === 'item-view'} <ItemView/> {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
