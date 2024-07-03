## Learning Note

### Create project by Vite

依照語言喜好建立對應的 react project

```ts
npm create vite@latest  {YOUR PROJECT NAME} -- --template react
npm create vite@latest  {YOUR PROJECT NAME} -- --template react-ts
```

CHANGE **{YOUR PROJECT NAME}** TO REAL PROJECT NAME

### Tailwind Setup

專案是使用 Vite 建立，可以直接依照[官網的步驟](https://tailwindcss.com/docs/guides/create-react-app)即可

### Form

- 原生取資料的方式
  
  > 要注意每一個 name 都需要是 unique，否則會被覆蓋

```ts
const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // get all element from form element
        const formElements = e.currentTarget.elements;

        // create object to store data
        const formData: { [key: string]: string } = {};

        // loop to pass the data from every element into formData object
        for (let i = 0; i < formElements.length; i++) {
            const input = formElements[i] as HTMLInputElement;
            if (input.name && input.type !== 'button' && input.type !== 'submit') {
                formData[input.name] = input.value;
            }
        }
        console.log(formData);
    }
```

- 使用 reacthookform 取資料的方式