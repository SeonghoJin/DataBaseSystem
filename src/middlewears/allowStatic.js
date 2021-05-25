import path from 'path';
import express from 'express'

export default (expressApp) => {
    expressApp.use("/static", express.static(path.join(path.resolve(), '/src/static')));
}
