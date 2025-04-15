import RoundedButton from "@/components/buttons/RoundedButton";
import InputField from "@/components/form-fields/InputField";
import Label from "@/components/form-fields/Label";
import { cn } from "@/lib/utils";

const UnitsAndDimensionsForm = ({
  nextTab = () => {},
  prevTab = () => {},
  unitsAvailable,
  setUnitsAvailable,
  length,
  setLength,
  width,
  setWidth,
  height,
  setHeight,
  weight,
  setWeight,
  conditionRating,
  setConditionRating,
  productCategories,
  setProductCategories,
  productConditionsList,
  productCondition,
  setProductCondition,
}) => {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-5 py-10">
      <div className="flex w-full flex-col gap-1">
        <h1 className="text-xl font-medium">Units & Dimensions</h1>
        <span className="text-sm text-battleShipGray">
          Add the measurements of your product.
        </span>
      </div>
      <div className="grid w-full gap-5 md:grid-cols-2 md:gap-10">
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-1">
            {/* <Label text="Number of Units available" /> */}
            <InputField
              type="text"
              placeholder="Available units"
              value={unitsAvailable}
              onChange={(e) => setUnitsAvailable(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            {/* <Label text="Length(in)" /> */}
            <InputField
              type="text"
              placeholder="Length 0.00 in"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            {/* <Label text="Width(in)" /> */}
            <InputField
              type="text"
              placeholder="Width 0.00 in"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            {/* <Label text="Height(in)" /> */}
            <InputField
              type="text"
              placeholder="Height 0.00 in"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            {/* <Label text="Weight(kg)" /> */}
            <InputField
              type="text"
              placeholder="Weight 0.00 kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-1">
            <Label text="Product Condition" />
            <div className="flex items-center gap-3">
              {productConditionsList.map((condition, index) => (
                <button
                  key={index}
                  className={cn(
                    "rounded-lg border px-8 py-2",
                    productCondition == condition
                      ? "border-moonstone bg-moonstone text-white"
                      : "border-battleShipGray",
                  )}
                  onClick={() => setProductCondition(condition)}
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {/* <Label text="Condition Rating" /> */}
            <InputField
              type="text"
              placeholder="Condition Rating (0/10)"
              value={conditionRating}
              onChange={(e) => setConditionRating(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            {/* <Label text="Product Categories" /> */}
            <InputField
              type="text"
              placeholder="Add category of your product"
              value={productCategories}
              onChange={(e) => setProductCategories(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center pb-20 pt-8">
        <RoundedButton
          onClick={() => nextTab()}
          title="Next"
          showIcon
          className="w-64"
        />
      </div>
    </div>
  );
};

export default UnitsAndDimensionsForm;
