using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication3.Models;

using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace WebApplication3.Controllers
{
    public class HomeController : Controller
    {
        IHostingEnvironment _environment;

        public HomeController(IHostingEnvironment environment)
        {
            _environment = environment;
        }

        public IActionResult IndexUpload()
        {
            return View();
        }

        public IActionResult IndexDownload()
        {
            string[] fileNames = Directory.GetFiles(Path.Combine(_environment.ContentRootPath, "MyStaticFiles", "uploads"));

            for (int i = 0; i < fileNames.Length; i++)
            {
                fileNames[i] = fileNames[i].Substring(fileNames[i].LastIndexOf('\\') + 1);
            }

            return View(fileNames);
        }

        [HttpPost]
        public async Task<IActionResult> Upload(FileUploadViewModel model)
        {
            var file = model.File;

            if (file.Length > 0)
            {
                string path = Path.Combine(_environment.ContentRootPath, "MyStaticFiles", "uploads", file.FileName);

                using (var fileStream = new FileStream(path, FileMode.OpenOrCreate, FileAccess.Write))
                {
                    fileStream.Seek(0, SeekOrigin.End);

                    await file.CopyToAsync(fileStream);
                }

                return Ok(model);
            }

            return BadRequest();
        }

        public IActionResult Download(string fileName)
        {
            string path = Path.Combine(_environment.ContentRootPath, "MyStaticFiles", "uploads", fileName);
            return PhysicalFile(path, "application/octet-stream", fileName);
        }

        [HttpPost]
        public IActionResult Delete(string fileName)
        {
            string path = Path.Combine(_environment.ContentRootPath, "MyStaticFiles", "uploads", fileName);

            System.IO.File.Delete(path);

            return Ok(fileName);
        }
    }
}
