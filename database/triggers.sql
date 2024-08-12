CREATE TRIGGER HISTORIA_INSERT AFTER INSERT ON ListaProductos
FOR EACH ROW 
	INSERT INTO HistoriaPrecios 
	(fk_producto, fk_lp, monto, cantidad_min,descuento, createdAt, updatedAt, barra, deleted)
	VALUES (new.fk_producto, 
	new.fk_lista, 
	new.monto,
	new.cantidad_min, 
	new.descuento, 
	new.createdAt, 
	new.updatedAt,
	new.barra,
	false)
	
	
CREATE TRIGGER HISTORIA_UPDATE AFTER UPDATE ON ListaProductos
FOR EACH ROW 
	INSERT INTO HistoriaPrecios
	(fk_producto, fk_lp, monto, cantidad_min, descuento, createdAt, updatedAt, barra, deleted)
	values(
	new.fk_producto, 
	new.fk_lista, 
	new.monto,
	new.cantidad_min, 
	new.descuento, 
	new.createdAt, 
	new.updatedAt,
	new.barra,
	false
	)
	
	
CREATE TRIGGER HISTORIA_DELETE BEFORE DELETE ON ListaProductos
FOR EACH ROW 
	INSERT INTO HistoriaPrecios
	(fk_producto, fk_lp, monto, cantidad_min, descuento, createdAt, updatedAt, barra, deleted)
	values(
		old.fk_producto, 
		old.fk_lista, 
		old.monto,
		old.cantidad_min, 
		old.descuento, 
		old.createdAt, 
		old.updatedAt,
		old.barra,
		true
	)


CREATE TRIGGER HISTORIA_CARRO
AFTER INSERT
ON DetalleCarro
FOR EACH ROW
	INSERT INTO HistoriaCarro
	(fk_carro, 
	fk_producto,
	cantidad,
	id_lista,
	nombre_lista,
	descuento,
	descripcion,
	monto,
	createdAt,
	updatedAt)
	VALUES (
		new.fk_carro,
		new.fk_producto,
		new.cantidad,
		new.id_lista,
		new.nombre_lista,
		new.descuento,
		new.descripcion,
		new.monto,
		new.createdAt,
		new.updatedAt
	)

	CREATE TRIGGER HISTORIA_CARRO_UPDATE
AFTER UPDATE
ON DetalleCarro
FOR EACH ROW
	INSERT INTO HistoriaCarro
	(fk_carro, 
	fk_producto,
	cantidad,
	id_lista,
	nombre_lista,
	descuento,
	descripcion,
	monto,
	createdAt,
	updatedAt)
	VALUES (
		new.fk_carro,
		new.fk_producto,
		new.cantidad,
		new.id_lista,
		new.nombre_lista,
		new.descuento,
		new.descripcion,
		new.monto,
		new.createdAt,
		new.updatedAt
	)
	