using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;

namespace WebApplication3.Models
{
    public class FileUploadViewModel
    {
        public IFormFile File { get; set; }
    }
}
