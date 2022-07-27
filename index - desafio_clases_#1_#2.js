class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName(){
    return console.log(`El nombre completo del usuario es: ${this.nombre} ${this.apellido}`);
  };

  addMascota(mascota){
    this.mascotas.push(mascota);
  };

  countMascotas(){
    return console.log(this.mascotas.length);
  };

  addBook(nom, aut){
    let libro = {nombre: nom, autor: aut};
    this.libros.push(libro);
  };

  // getBookNames(){
  //   let nombreLibros = [];
  //   for(let i = 0 ; i < this.libros.length ; i++){
  //     nombreLibros.push(this.libros[i].nombre);
  //   }
  //   return console.log(nombreLibros);
  // };
  getBookNames() { return console.log(this.libros.map(obj => obj.nombre))} //correccion del profe

}

const usuario1 = new Usuario("Angelica", "Bulzicco", [{nombre: "Cien años de soledad", autor:"Gabriel García Márquez"}, {nombre:"El príncipe", autor:"Nicolás Maquiavelo"}], ["Perro"]);

// console.log(usuario1)
usuario1.getFullName();
usuario1.countMascotas();
usuario1.addMascota("gato");
console.log(usuario1.mascotas);
usuario1.countMascotas();
usuario1.getBookNames();
usuario1.addBook("El señor de los anillos", "J.R.R. Tolkien");
console.log(usuario1.libros);
usuario1.getBookNames();