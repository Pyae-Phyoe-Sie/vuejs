<template>
    <div class="not-found-div">
        <div>
            <img src="https://images.squarespace-cdn.com/content/v1/51cdafc4e4b09eb676a64e68/1470175715831-NUJOMI6VW13ZNT1MI0VB/ke17ZwdGBToddI8pDm48kEj8h6tFfEHTeCG-xJISxCF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UQNtHfWuxJOqPNnonx2vPn19YmYaYuKXkbKFz0xx0uTakvjJh3JJWsjdMZ66YIxKAg/image-asset.jpeg" />
        </div>
        <div>
            <p>404</p>
            <p>Page Not Found</p>
            <button class="add-btn" @click="goHome">Go Home</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'PageNotFound',
    methods: {
        goHome() {
            this.$router.push({name: 'home'})
        }
    }
}
</script>
