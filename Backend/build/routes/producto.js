"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
////Routes Producto
const express_1 = require("express");
const producto_1 = __importDefault(require("../models/producto"));
const categoria_1 = __importDefault(require("../models/categoria"));
class Producto {
    constructor() {
        this.router = express_1.Router();
        this.exponerRutas();
    }
    getProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productoBD = yield producto_1.default.find({}).sort('nombre');
                categoria_1.default.populate(productoBD, { path: "categorias", select: 'nombre' });
                let conteo = yield producto_1.default.countDocuments();
                res.send(productoBD);
            }
            catch (error) {
                return res.status(400).json({
                    errorGenerado: error
                });
            }
        });
    }
    postProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let bodycabecera = req.body;
                let producto = new producto_1.default({
                    nombre: bodycabecera.nombre,
                    precioUni: bodycabecera.precioUni,
                    descripcion: bodycabecera.descripcion,
                    categoria: bodycabecera.categoria
                });
                let productoBD = yield producto.save();
                res.json({
                    producto: productoBD
                });
            }
            catch (error) {
                return res.status(400).json({
                    errorGenerado: error
                });
            }
        });
    }
    getProductoId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let productoBD;
            try {
                let idurl = req.params.id;
                productoBD = yield producto_1.default.findById(idurl);
                productoBD.usuario.password = null;
                res.json({
                    ok: true,
                    producto: productoBD
                });
            }
            catch (error) {
                if (error) {
                    return res.status(400).json({
                        errorGenerado: error
                    });
                }
                if (productoBD === null) {
                    return res.status(400).json({
                        ok: false,
                        dato: "No se ha encontrado el producto :( "
                    });
                }
            }
        });
    }
    putProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idurl = req.params.id;
                let bodycabecera = req.body;
                let productoBD = yield producto_1.default.findByIdAndUpdate(idurl, bodycabecera, { new: true, runValidators: true, context: 'query' });
                res.json({
                    producto: productoBD
                });
            }
            catch (error) {
                return res.status(400).json({
                    ok: "ERROR (¬_¬) ",
                    dato: error
                });
            }
        });
    }
    deleteProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let productoBD;
            try {
                let idurl = req.params.id;
                productoBD = yield producto_1.default.findByIdAndRemove(idurl);
                res.json({
                    mensaje: "PRODUCTO ELIMINADO",
                    producto: productoBD
                });
            }
            catch (error) {
                if (error) {
                    return res.status(400).json({
                        ok: error,
                        message: "PRODUCTO NO ENCONTRADO",
                    });
                }
                else {
                    if (productoBD === null) {
                        return res.status(400).json({
                            codigo: "400",
                            message: "PRODUCTO NO ENCONTRADO",
                        });
                    }
                }
            }
        });
    }
    exponerRutas() {
        this.router.get('/', this.getProducto);
        this.router.get('/:id', this.getProductoId);
        this.router.post('/', this.postProducto);
        this.router.put('/:id', this.putProducto);
        this.router.delete('/:id', this.deleteProducto);
    }
}
const producto = new Producto();
exports.default = producto.router;
