import { HStack, Input, Button, Container, Box } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import Creatable from "react-select/creatable";
import { SelectStyle } from "styles/Select";
import { IngredientQuantityType } from "./IngredientList";
import { Option } from "components/Selects/CustomSelect";
import UnitSelect from "components/Selects/UnitSelect";
import { toast } from "react-toastify";

export interface IngredientType {
  id: number | string;
  label: string;
  value: string;
}

interface AddIngredientType {
  addIngredient: (ingredient: IngredientQuantityType) => void;
  ingredients: Array<IngredientType>;
}

const AddIngredient = ({ addIngredient, ingredients }: AddIngredientType) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>();
  const [unit, setUnit] = useState<Option>();

  const handleSubmit = () => {
    if (!name || !amount || !unit) {
      toast.error("Invalid ingredient");
    } else if (name && amount && unit) {
      const ing = {
        id: nanoid(),
        name: name,
        amount: amount,
        unit: unit.value,
      };
      addIngredient(ing);
    }
  };

  return (
    <Container centerContent>
      <HStack w="100%">
        <Box w="33%">
          <Creatable
            placeholder="Ingredient"
            onChange={(e) => (e ? setName(e.value) : null)}
            options={ingredients}
            styles={SelectStyle}
          />
        </Box>
        <Input
          w="33%"
          placeholder="Amount"
          onChange={(e) => setAmount(+e.target.value)}
          value={amount}
        />
        <UnitSelect w="33%" onChange={setUnit} />
      </HStack>
      <Button mt={4} color="font" onClick={handleSubmit}>
        Add ingredient
      </Button>
    </Container>
  );
};

export default AddIngredient;
