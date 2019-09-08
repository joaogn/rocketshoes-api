import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

export const ProductStoreValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    title: Yup.string().required('Title is Required'),
    price: Yup.number().required('Price is Required'),
    amount: Yup.number().required('Amount is Required'),
    image_id: Yup.number().required('Image_id is Required'),
  });

  schema
    .validate(req.body)
    .then(() => {
      next();
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};

export const ProductUpdateValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    title: Yup.string(),
    price: Yup.number(),
    amount: Yup.number(),
    image_id: Yup.number(),
  });

  schema
    .validate(req.body)
    .then(() => {
      next();
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};
