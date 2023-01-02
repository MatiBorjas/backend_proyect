function deleteProd(e) {
  let prodId = e.target.value;
  fetch(window.location.href + "/" + prodId, {
    method: "DELETE",
  }).then((res) => location.reload()); // or res.json()
}