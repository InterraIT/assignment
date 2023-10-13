using ContactAppAPI.M_odels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.IO;

namespace ContactAppAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private const string FilePath = "data.xml";
        private static string NewFilePath = Environment.CurrentDirectory + "\\Data\\data.json";
        public static List<Contact> GetExisting()
        {
            List<Contact> existingData = new List<Contact>();


            //JSON Code
            var jsonData = System.IO.File.ReadAllText(NewFilePath);
            var users = JsonConvert.DeserializeObject<List<Contact>>(jsonData);
            return users;
        }

        [HttpGet]
        public IActionResult AllContact()
        {

            List<Contact> existingData = new List<Contact>();
            existingData = GetExisting();

            return Ok(existingData);
        }

        [HttpGet("{id}")]
        public IActionResult GetContact(int id)
        {
            List<Contact> existingData = new List<Contact>();

            existingData = GetExisting();

            var contact = existingData.Find(x => x.Id == id);
            if (contact == null)
            {
                return NotFound("Contact not found");
            }
            return Ok(contact);
        }
        [HttpPost]
        public IActionResult AddContact(Contact contact)
        {


            List<Contact> existingData = new List<Contact>();

            existingData = GetExisting();

            // Add the new data
            existingData.Add(contact);

            string json = JsonConvert.SerializeObject(existingData.ToArray());
            System.IO.File.WriteAllText(NewFilePath, json);


            return Ok("Save Done");
        }

        [HttpPut]
        public IActionResult UpdateContact(Contact contact)
        {
            List<Contact> existingData = new List<Contact>();
            existingData = GetExisting();

            var getContactInList = existingData.Find(x => x.Id == contact.Id);
            if (getContactInList == null)
            {
                return NotFound("Contact not found");
            }
            getContactInList.FirstName = contact.FirstName;
            getContactInList.LastName = contact.LastName;
            getContactInList.Email = contact.Email;


            string json = JsonConvert.SerializeObject(existingData.ToArray());
            System.IO.File.WriteAllText(NewFilePath, json);

            return Ok(getContactInList);

        }
        [HttpDelete]
        public IActionResult DeleteContact(int id)
        {
            List<Contact> existingData = new List<Contact>();
            existingData = GetExisting();

            var getContactInList = existingData.Find(x => x.Id == id);
            if (getContactInList == null)
            {
                return NotFound("Contact not found");
            }
            existingData.Remove(getContactInList);

            string json = JsonConvert.SerializeObject(existingData.ToArray());
            System.IO.File.WriteAllText(NewFilePath, json);


            return Ok("Data Deleted");
        }
    }
}
