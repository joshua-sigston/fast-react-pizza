import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const username = useSelector((state) => state.user.username);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();
  const cart = fakeCart;

  return (
    <div className='h-[100%] flex flex-col justify-center items-center space-y-3'>
      <h2>Ready to order? Lets go!</h2>

      <Form
        method='POST'
        className='w-[100%] flex flex-col items-center space-y-3'
      >
        <div className='input-container'>
          <label>First Name</label>
          <input
            type='text'
            name='customer'
            defaultValue={username}
            className='input'
            required
          />
        </div>

        <div className='input-container'>
          <label>Phone number</label>
          <div>
            <input type='tel' name='phone' className='input' required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div className='input-container'>
          <label>Address</label>
          <div>
            <input type='text' name='address' className='input' required />
          </div>
        </div>

        <div className='flex items-center space-x-2'>
          <label htmlFor='priority'>Want to yo give your order priority?</label>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type='primary'>
            {isSubmitting ? 'Placing order...' : 'Order now'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please fill out your phone number';
  }

  if (Object.keys(errors).length > 0) return errors;

  console.log(order);

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
