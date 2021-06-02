const form = document.querySelector('#crawlForm');
const token = document.querySelector('.token');
const product = document.querySelector('.product');
const loader = document.querySelector('.loader');
const submitBtn = document.querySelector('.submitBtn');
const prod_img = document.querySelector('.prod-img img');
const prod_title = document.querySelector('.title');
const prod_subTitle = document.querySelector('.sub-title');
const prod_price = document.querySelector('.price');
const prod_desc = document.querySelector('.desc');
const url = document.querySelector('.url');


form.addEventListener('submit', async function (e) {
  e.preventDefault();
  product.classList.remove('show');

  loader.style.display = 'block';
  submitBtn.style.display = 'none';

  const data = await getData();

  loader.style.display = 'none';
  submitBtn.style.display = 'block';

  if (data.status !== 200) {
    alert(data.message);
    return;
  }

  console.log(data);
  const { brand, name, price, mainImage, description } = data.product;

  showData(brand, name, price, mainImage, description);

});

async function getData() {
  try {
    const res = await fetch('/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: form.token.value, url: url.form.url.value }),
    });

    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

function showData(brand, name, price, mainImage, description) {

  prod_img.src = mainImage;
  prod_title.textContent = brand;
  prod_subTitle.textContent = name;
  prod_price.textContent = price;
  prod_desc.textContent = description;

  product.classList.toggle('show');
}
