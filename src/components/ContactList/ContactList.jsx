import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";


const ContactList=({contacts, onDelete})=> {
  return (
      <ul className={css.item}>
          {contacts.map(({ id, name, number }) => (
              <li className={css.item} key={id}>
                  <Contact key={id} id={id} name={name} number={number} onDelete={onDelete} />
              </li>
          ))}           
      </ul>
  );
}

export default ContactList;
