const qryOfertas = `
SELECT MAX(HP.ID) AS 'ULTIMO_ID',
HP.fk_lp, 
LS.nombre as 'nombre_lista_precio',
HP.fk_producto,
P.titulo,
P.descripcion,
P.file,
P.barra,
P.createdAt,
P.updatedAt,
P.file,
C.id,
C.nombre as 'Nombre_categoria',
C.id as 'id_categoria',
LP.monto,
LP.cantidad_min,
LP.descuento
FROM HistoriaPrecios HP
JOIN ListaProductos LP 
ON LP.fk_lista  = HP.fk_lp AND
LP.fk_producto  = HP.fk_producto
JOIN Producto P
ON LP.fk_producto = P.codigo 
JOIN CATEGORIA C
ON C.id =  P.fk_categoria_producto
JOIN ListaPrecios LS 
ON LP.fk_lista = LS.id 
WHERE HP.monto > LP.monto 
OR LP.descuento >1
GROUP BY HP.fk_producto, HP.fk_lp;
  `;

const qryCarros = `
SELECT C.ID, C.REVISADO,
C.fk_cliente, SUM(DC.monto),
COUNT(DC.fk_producto) 
FROM Carro C
JOIN DetalleCarro DC
ON DC.fk_carro = C.id 
group by DC.fk_carro , DC.fk_producto 
`;


module.exports = qryOfertas;
