<template>
    <div class="form">
        <div class="form-header">
            <h1>Book Registration</h1>
        </div>

        <div class="form-row">
            <div class="form-control">
                <div class="form-column">
                    <input type="text" required/>
                    <label>Book Name</label>
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="form-control">
                <div class="form-column">
                    <input type="text" required/>
                    <label>Author Name</label>
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="form-control">
                <div class="form-column">
                    <input type="text" required/>
                    <label>Price</label>
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="form-control">
                <div class="form-column">
                    <input type="text" required/>
                    <label>Quantity</label>
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="form-control">
                <div class="form-column">
                    <button>Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Index'
}
</script>

<style scoped>
</style>
