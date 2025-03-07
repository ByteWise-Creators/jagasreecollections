import classNames from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";
import { motion } from "framer-motion";

import ProductPopup from "./ProductPopup";
import usePopupBackDrop from "../hooks/usePopupBackDrop";

const ProductCard = ({ product, cardWidth, heightOfImg }) => {
  const { BackDrop, openPopup, closePopup } = usePopupBackDrop(false, true);
  const { name, description, imgs } = product;

  const [hovered, setHovered] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0.15 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onClick={openPopup}
        className={classNames(
          `flex flex-col snap-start cursor-pointer ${cardWidth}`
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative overflow-hidden">
          <motion.img
            src={imgs[0]}
            loading="lazy"
            className={classNames(
              "object-cover w-full transition-all duration-300 hover:scale-105",
              heightOfImg
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {imgs.length > 1 && (
            <motion.img
              src={imgs[1]}
              loading="lazy"
              className={classNames(
                "absolute top-0 left-0 w-full h-full object-cover transition-all duration-300 hover:scale-105",
                heightOfImg
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>

        {/* Product Details */}
        <div className="px-2">
          <h3 className="font-heading text-xl font-bold text-text">
            {name.length > 20 ? name.substring(0, 20) + " ..." : name}
          </h3>
          <p className="font-body font-medium text-gray-600 leading-[18px] h-14 overflow-y-hidden text-sm">
            {description.length > 85
              ? description.substring(0, 85) + " ..."
              : description}
          </p>
          <p className="text-sm font-semibold text-text font-madeInIndia">
            Made in India
          </p>
        </div>
      </motion.div>

      {/* Popup */}
      <BackDrop>
        <ProductPopup closePopup={closePopup} product={product} />
      </BackDrop>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  cardWidth: PropTypes.string,
  heightOfImg: PropTypes.string.isRequired,
};

export default ProductCard;
