using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MauiApp3.Data
{
    public class Location
    {
        public int id { get; set; }
        public int Id { get; internal set; }
        public int latitude { get; set; }
        public int lognitude { get; set;}
        public string Name { get; internal set; }
    }
}
