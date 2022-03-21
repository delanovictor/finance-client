<template>
    <!-- <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div> -->
    <router-view />

</template>

<script>
import './assets/tailwind.css'

export default {}
</script>
<style>
::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #7077a1;
    border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: rgb(158, 207, 195);
    border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: rgb(178, 195, 224);
}

#app {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

textarea {
    padding: 3px;
    height: 100%;
}

input {
    padding: 3px;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.4s ease-in-out;
}
.list-enter-from {
    opacity: 0;
    transform: translateX(-1000px);
}

.list-leave-to {
    opacity: 0;
    transform: translateX(1000px);
}
</style>
