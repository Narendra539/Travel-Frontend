<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
// import UserServices from "../services/UserServices.js";

onMounted(async () => {
  
});
</script>
<template>
        <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
            <div class="carousel-item active">
            <img src="/home2.png" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
            <img src="/home3.png" class="d-block w-100" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        </div><br/>
        <div class="container from-to">
        <div class="row justify-content-center">
            <div class="col-xl-6 from-to-search">
                <div class="text-center text-white">
                    <h2 class="mb-5 title">Life is short, and the world is wide.</h2>
                    <div class="container" style="padding:10px;">
                        <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                            <input type="text" class="form-control" id="from" placeholder="From">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                            <input type="text" class="form-control" id="to" placeholder="To">
                            </div>
                        </div>
                        </div><br/>
                        <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                            <input type="date" class="form-control" id="departure">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                            <input type="date" class="form-control" id="return">
                            </div>
                        </div>
                        <div class="col-md-12 search-button">
                            <div class="form-group col-md-6">
                            <button type="submit" class="btn">Search Now</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <img class="col-xl-6 from-to-image" src="/home2.png"/>
        </div>
        </div><br/>
        
    <div class="container">
        <h2> Most Visited Places </h2>
        <div class="card-group">
        <div class="card">
            <img class="card-img-top" src="/place1.png" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
            </div>
        </div>
        <div class="card">
            <img class="card-img-top" src="/place2.png" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
            </div>
        </div>
        <div class="card">
            <img class="card-img-top" src="/place3.png" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
            </div>
            <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
            </div>
        </div>
        </div>
    </div><br/><br/>

    <div class="container">
        <h2> Couple Travel </h2>
        <div class="card-group">
        <div class="card">
            <img class="card-img-top" src="/place1.png" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        <div class="card">
            <img class="card-img-top" src="/place2.png" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            </div>
        </div>
        <div class="card">
            <img class="card-img-top" src="/place3.png" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
            </div>
        </div>
        </div>
    </div><br/>
</template>

<style scoped>

.btn {
  color:white;margin-top:25px;width:100%;background-color:#80162B;
}
.title {
    color: #555;
}
.search-button {
    display: flex;
    justify-content: center;
}
.from-to {
    background-color: white;
    /* padding: 50px; */
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.from-to-image {
    margin-right: -23px;
}
.from-to-search {
    padding: 50px;
}
</style>