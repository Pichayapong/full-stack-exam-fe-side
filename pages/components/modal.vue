<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Modal</h2>
    </div>
    <div class="flex flex-wrap">
      <div class="w-1/2">
        <div id="blank-modal" class="p-5">
          <div class="preview">
            <!-- BEGIN: Modal Toggle -->
            <div class="text-center">
              <a
                href="javascript:;"
                data-toggle="modal"
                data-target="#basic-modal-preview"
                class="btn btn-primary"
                >Show Modal</a
              >
            </div>
            <!-- END: Modal Toggle -->
            <!-- BEGIN: Modal Content -->
            <div
              id="basic-modal-preview"
              class="modal"
              tabindex="-1"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-body p-10 text-center">
                    This is totally awesome blank modal!
                  </div>
                </div>
              </div>
            </div>
            <!-- END: Modal Content -->
          </div>
          <div class="source-code hidden">
            <button
              data-target="#copy-blank-modal"
              class="copy-code btn py-1 px-2 btn-outline-secondary"
            >
              <FileIcon class="w-4 h-4 mr-2" /> Copy example code
            </button>
            <div class="overflow-y-auto mt-3 rounded-md">
              <Highlight id="copy-blank-modal" class="source-preview">
                <code
                  class="text-xs p-0 rounded-md html pl-5 pt-8 pb-4 -mb-10 -mt-10"
                >
                  <textarea>
                      <!-- BEGIN: Modal Toggle -->
                      <div class="text-center">
                        <a
                          href="javascript:;"
                          data-toggle="modal"
                          data-target="#basic-modal-preview"
                          class="btn btn-primary"
                          >Show Modal</a
                        >
                      </div>
                      <!-- END: Modal Toggle -->
                      <!-- BEGIN: Modal Content -->
                      <div
                        id="basic-modal-preview"
                        class="modal"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-body p-10 text-center">
                              This is totally awesome blank modal!
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- END: Modal Content -->
                    </textarea
                  >
                </code>
              </Highlight>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <div id="modal-size" class="p-5">
          <div class="preview">
            <div class="text-center">
              <!-- BEGIN: Small Modal Toggle -->
              <a
                href="javascript:;"
                data-toggle="modal"
                data-target="#small-modal-size-preview"
                class="btn btn-primary mr-1 mb-2"
                >Show Small Modal</a
              >
              <!-- END: Small Modal Toggle -->
              <!-- BEGIN: Medium Modal Toggle -->
              <a
                href="javascript:;"
                data-toggle="modal"
                data-target="#medium-modal-size-preview"
                class="btn btn-primary mr-1 mb-2"
                >Show Medium Modal</a
              >
              <!-- END: Medium Modal Toggle -->
              <!-- BEGIN: Large Modal Toggle -->
              <a
                href="javascript:;"
                data-toggle="modal"
                data-target="#large-modal-size-preview"
                class="btn btn-primary mr-1 mb-2"
                >Show Large Modal</a
              >
              <!-- END: Large Modal Toggle -->
              <!-- BEGIN: Super Large Modal Toggle -->
              <a
                href="javascript:;"
                data-toggle="modal"
                data-target="#superlarge-modal-size-preview"
                class="btn btn-primary mr-1 mb-2"
                >Show Superlarge Modal</a
              >
              <!-- END: Super Large Modal Toggle -->
            </div>
            <!-- BEGIN: Small Modal Content -->
            <div
              id="small-modal-size-preview"
              class="modal"
              tabindex="-1"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-sm">
                <div class="modal-content">
                  <div class="modal-body p-10 text-center">
                    This is totally awesome small modal!
                  </div>
                </div>
              </div>
            </div>
            <!-- END: Small Modal Content -->
            <!-- BEGIN: Medium Modal Content -->
            <div
              id="medium-modal-size-preview"
              class="modal"
              tabindex="-1"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-body p-10 text-center">
                    This is totally awesome medium modal!
                  </div>
                </div>
              </div>
            </div>
            <!-- END: Medium Modal Content -->
            <!-- BEGIN: Large Modal Content -->
            <div
              id="large-modal-size-preview"
              class="modal"
              tabindex="-1"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-body p-10 text-center">
                    This is totally awesome large modal!
                  </div>
                </div>
              </div>
            </div>
            <!-- END: Large Modal Content -->
            <!-- BEGIN: Super Large Modal Content -->
            <div
              id="superlarge-modal-size-preview"
              class="modal"
              tabindex="-1"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-body p-10 text-center">
                    This is totally awesome superlarge modal!
                  </div>
                </div>
              </div>
            </div>
            <!-- END: Super Large Modal Content -->
          </div>
          <div class="source-code hidden">
            <button
              data-target="#copy-modal-size"
              class="copy-code btn py-1 px-2 btn-outline-secondary"
            >
              <FileIcon class="w-4 h-4 mr-2" /> Copy example code
            </button>
            <div class="overflow-y-auto mt-3 rounded-md">
              <Highlight id="copy-modal-size" class="source-preview">
                <code
                  class="text-xs p-0 rounded-md html pl-5 pt-8 pb-4 -mb-10 -mt-10"
                >
                  <textarea>
                      <div class="text-center">
                        <!-- BEGIN: Small Modal Toggle -->
                        <a
                          href="javascript:;"
                          data-toggle="modal"
                          data-target="#small-modal-size-preview"
                          class="btn btn-primary mr-1 mb-2"
                          >Show Small Modal</a
                        >
                        <!-- END: Small Modal Toggle -->
                        <!-- BEGIN: Medium Modal Toggle -->
                        <a
                          href="javascript:;"
                          data-toggle="modal"
                          data-target="#medium-modal-size-preview"
                          class="btn btn-primary mr-1 mb-2"
                          >Show Medium Modal</a
                        >
                        <!-- END: Medium Modal Toggle -->
                        <!-- BEGIN: Large Modal Toggle -->
                        <a
                          href="javascript:;"
                          data-toggle="modal"
                          data-target="#large-modal-size-preview"
                          class="btn btn-primary mr-1 mb-2"
                          >Show Large Modal</a
                        >
                        <!-- END: Large Modal Toggle -->
                        <!-- BEGIN: Super Large Modal Toggle -->
                        <a
                          href="javascript:;"
                          data-toggle="modal"
                          data-target="#superlarge-modal-size-preview"
                          class="btn btn-primary mr-1 mb-2"
                          >Show Superlarge Modal</a
                        >
                        <!-- END: Super Large Modal Toggle -->
                      </div>
                      <!-- BEGIN: Small Modal Content -->
                      <div
                        id="small-modal-size-preview"
                        class="modal"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-sm">
                          <div class="modal-content">
                            <div class="modal-body p-10 text-center">
                              This is totally awesome small modal!
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- END: Small Modal Content -->
                      <!-- BEGIN: Medium Modal Content -->
                      <div
                        id="medium-modal-size-preview"
                        class="modal"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-body p-10 text-center">
                              This is totally awesome medium modal!
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- END: Medium Modal Content -->
                      <!-- BEGIN: Large Modal Content -->
                      <div
                        id="large-modal-size-preview"
                        class="modal"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-lg">
                          <div class="modal-content">
                            <div class="modal-body p-10 text-center">
                              This is totally awesome large modal!
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- END: Large Modal Content -->
                      <!-- BEGIN: Super Large Modal Content -->
                      <div
                        id="superlarge-modal-size-preview"
                        class="modal"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-xl">
                          <div class="modal-content">
                            <div class="modal-body p-10 text-center">
                              This is totally awesome superlarge modal!
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- END: Super Large Modal Content -->
                    </textarea
                  >
                </code>
              </Highlight>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalComponents',
  layout: 'dashboard',
  data() {
    return {}
  },
}
</script>

<style></style>
