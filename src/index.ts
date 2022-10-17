import colors from "colors";

import app from "./App";

try {
  app.listen(process.env.PORT, () => {
    console.log(colors.green(`Server listening on port ${process.env.PORT} \n`));
  });
} catch (error) {
  console.log(colors.red(error.message));
}
